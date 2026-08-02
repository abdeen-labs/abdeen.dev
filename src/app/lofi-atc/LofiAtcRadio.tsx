"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useSlider } from "@/hooks/useSlider";
import styles from "./lofi-atc.module.css";

interface LofiStation {
  name: string;
  url: string;
  credit: string;
  creditUrl: string;
}

const LOFI_STATIONS: LofiStation[] = [
  {
    name: "Lo-fi",
    url: "https://play.streamafrica.net/lofiradio",
    credit: "Stream Africa",
    creditUrl: "https://streamafrica.net",
  },
  {
    name: "Chill",
    url: "https://streams.ilovemusic.de/iloveradio17.mp3",
    credit: "iLoveRadio",
    creditUrl: "https://ilovemusic.de",
  },
  {
    name: "Ambient",
    url: "https://phoebe.streamerr.co:1140/ambient.mp3",
    credit: "Ambient FM",
    creditUrl: "https://ambient.fm",
  },
];

const ATC_SOURCE = {
  // Must be https: the production site is served over TLS, so an http
  // stream would be blocked as mixed content and never play
  url: "https://d.liveatc.net/kjfk9_s",
  credit: "LiveATC.net",
  creditUrl: "https://www.liveatc.net",
  label: "JFK Gnd/Twr",
};

const BARS = 11;

type StreamStatus = "idle" | "connecting" | "live" | "error";

// Module-level set so cleanup can always find and kill active audio,
// even if React refs have been cleared by the time cleanup runs.
const activeAudios = new Set<HTMLAudioElement>();

function killAllAudio() {
  activeAudios.forEach((a) => {
    a.pause();
    a.src = "";
    a.load();
  });
  activeAudios.clear();
}

/** Session clock for the readout — mm:ss, h:mm:ss past the first hour. */
function formatElapsed(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

function statusLabel(s: StreamStatus): string {
  if (s === "idle") return "Standby";
  if (s === "connecting") return "Connecting";
  if (s === "live") return "Live";
  return "Error";
}

export default function LofiAtcRadio() {
  const lofiRef = useRef<HTMLAudioElement | null>(null);
  const atcRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mergerRef = useRef<GainNode | null>(null);
  const lofiGainRef = useRef<GainNode | null>(null);
  const atcGainRef = useRef<GainNode | null>(null);
  const rafRef = useRef<number>(0);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isSafari, setIsSafari] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [stationIdx, setStationIdx] = useState(0);
  const [lofiVol, setLofiVol] = useState(0.35);
  const [atcVol, setAtcVol] = useState(0.5);
  const [lofiStatus, setLofiStatus] = useState<StreamStatus>("idle");
  const [atcStatus, setAtcStatus] = useState<StreamStatus>("idle");
  const [elapsedSec, setElapsedSec] = useState(0);

  const station = LOFI_STATIONS[stationIdx];
  const stationSlider = useSlider(stationIdx);

  // Restore and persist volume levels across visits
  useEffect(() => {
    try {
      const savedLofi = parseFloat(localStorage.getItem("lofi-atc:lofiVol") ?? "");
      const savedAtc = parseFloat(localStorage.getItem("lofi-atc:atcVol") ?? "");
      if (savedLofi >= 0 && savedLofi <= 1) setLofiVol(savedLofi);
      if (savedAtc >= 0 && savedAtc <= 1) setAtcVol(savedAtc);
    } catch {
      // storage unavailable (private mode) — keep defaults
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("lofi-atc:lofiVol", String(lofiVol));
      localStorage.setItem("lofi-atc:atcVol", String(atcVol));
    } catch {
      // storage unavailable — nothing to do
    }
  }, [lofiVol, atcVol]);

  // Session clock — feeds the one phosphor readout. Runs only while the
  // session is open; on stop the readout leaves the screen with it.
  useEffect(() => {
    if (!playing) {
      setElapsedSec(0);
      return;
    }
    const startedAt = Date.now();
    const id = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [playing]);

  // stop everything on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      killAllAudio();
      ctxRef.current?.close();
      ctxRef.current = null;
      analyserRef.current = null;
      mergerRef.current = null;
      lofiRef.current = null;
      atcRef.current = null;
    };
  }, []);

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua)) {
      setIsSafari(true);
    }
  }, []);

  const getAudioContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const startVisualizer = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let silentFrames = 0;

    const tick = () => {
      analyser.getByteFrequencyData(dataArray);

      const hasSignal = dataArray.some((v) => v > 0);
      // Safari's AnalyserNode returns all zeros with createMediaElementSource
      // (WebKit bug). Count consecutive silent frames, but always recover
      // if real data arrives (streams can take a while to buffer).
      if (hasSignal) {
        silentFrames = 0;
      } else {
        silentFrames++;
      }
      const useFallback = silentFrames > 120;

      const now = performance.now();
      const len = dataArray.length;
      for (let i = 0; i < BARS; i++) {
        const bar = barsRef.current[i];
        if (!bar) continue;

        let val: number;
        if (useFallback) {
          val =
            0.3 +
            0.35 * Math.sin(now / 600 + i * 0.9) +
            0.15 * Math.sin(now / 300 + i * 1.7);
        } else {
          const idx = Math.floor((i / BARS) * len * 0.4);
          val = dataArray[idx] / 255;
        }

        const s = 0.125 + val * 0.875;
        const o = 0.3 + val * 0.7;
        bar.style.transform = `scaleY(${s})`;
        bar.style.opacity = `${o}`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    tick();
  }, []);

  const stopVisualizer = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    for (let i = 0; i < BARS; i++) {
      const bar = barsRef.current[i];
      if (!bar) continue;
      bar.style.transform = "scaleY(0.125)";
      bar.style.opacity = "0.25";
    }
  }, []);

  const ensureAnalyserGraph = useCallback(() => {
    const ctx = getAudioContext();
    if (!analyserRef.current) {
      const merger = ctx.createGain();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.8;
      merger.connect(analyser);
      analyser.connect(ctx.destination);
      mergerRef.current = merger;
      analyserRef.current = analyser;
    }
    return { ctx, merger: mergerRef.current! };
  }, [getAudioContext]);

  const connectToGraph = useCallback(
    (
      audio: HTMLAudioElement,
      gainRef: React.RefObject<GainNode | null>,
      volume: number,
    ) => {
      const { ctx, merger } = ensureAnalyserGraph();
      const source = ctx.createMediaElementSource(audio);
      const gain = ctx.createGain();
      gain.gain.value = volume;
      source.connect(gain);
      gain.connect(merger);
      gainRef.current = gain;
    },
    [ensureAnalyserGraph],
  );

  const createAudio = useCallback(
    (
      url: string,
      volume: number,
      setStatus: (s: StreamStatus) => void,
      gainRef: React.RefObject<GainNode | null>,
    ): HTMLAudioElement => {
      const audio = new Audio(url);
      audio.crossOrigin = "anonymous";
      // Keep element volume at 1 — GainNode handles actual volume.
      // Safari ignores HTMLAudioElement.volume once routed through Web Audio.
      audio.volume = 1;
      setStatus("connecting");
      activeAudios.add(audio);

      audio.addEventListener("playing", () => setStatus("live"));
      audio.addEventListener("error", () => setStatus("error"));
      audio.addEventListener("stalled", () => setStatus("connecting"));
      audio.addEventListener("waiting", () => setStatus("connecting"));

      connectToGraph(audio, gainRef, volume);

      return audio;
    },
    [connectToGraph],
  );

  const startStreams = useCallback(
    (lofiUrl: string) => {
      const lofi = createAudio(lofiUrl, lofiVol, setLofiStatus, lofiGainRef);
      const atc = createAudio(ATC_SOURCE.url, atcVol, setAtcStatus, atcGainRef);
      lofiRef.current = lofi;
      atcRef.current = atc;
      lofi.play().catch(() => setLofiStatus("error"));
      atc.play().catch(() => setAtcStatus("error"));
      setPlaying(true);
      startVisualizer();
    },
    [lofiVol, atcVol, createAudio, startVisualizer],
  );

  const stopStreams = useCallback(() => {
    killAllAudio();
    lofiRef.current = null;
    atcRef.current = null;
    lofiGainRef.current = null;
    atcGainRef.current = null;
    setPlaying(false);
    setLofiStatus("idle");
    setAtcStatus("idle");
    stopVisualizer();
  }, [stopVisualizer]);

  const handlePlay = useCallback(() => {
    if (playing) {
      stopStreams();
      return;
    }
    startStreams(station.url);
  }, [playing, station.url, startStreams, stopStreams]);

  const handleStationChange = useCallback(
    (idx: number) => {
      setStationIdx(idx);
      if (playing) {
        const old = lofiRef.current;
        if (old) {
          old.pause();
          old.src = "";
          old.load();
          activeAudios.delete(old);
        }
        lofiRef.current = null;
        lofiGainRef.current = null;
        stopVisualizer();
        setLofiStatus("connecting");
        const lofi = createAudio(
          LOFI_STATIONS[idx].url,
          lofiVol,
          setLofiStatus,
          lofiGainRef,
        );
        lofiRef.current = lofi;
        lofi.play().catch(() => setLofiStatus("error"));
        startVisualizer();
      }
    },
    [playing, lofiVol, createAudio, startVisualizer, stopVisualizer],
  );

  const handleLofiVol = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      setLofiVol(v);
      if (lofiGainRef.current) lofiGainRef.current.gain.value = v;
    },
    [],
  );

  const handleAtcVol = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      setAtcVol(v);
      if (atcGainRef.current) atcGainRef.current.gain.value = v;
    },
    [],
  );

  // The word carries the state; jade only for Live, ink for the rest. An
  // error gets the hazard stripe beside it, never a red fill or button.
  const stateClass = (s: StreamStatus) =>
    s === "live" ? styles.stateLive : s === "error" ? styles.stateFault : undefined;

  const channels = [
    { name: "Lo-fi", status: lofiStatus },
    { name: "ATC", status: atcStatus },
  ];

  return (
    <div className={styles.container}>
      {/* Signal stage — a sunken readout field. The session clock is the
          screen's one phosphor element and leaves with the stream. */}
      <div className={`tool-stage ${styles.stage}`}>
        <div className={styles.waveWrap} aria-hidden="true">
          {Array.from({ length: BARS }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { barsRef.current[i] = el; }}
              className={styles.bar}
            />
          ))}
        </div>
        <div className={styles.stageStatus}>
          {playing ? (
            <>
              <span className="micro-label">On air</span>
              <span className={`readout ${styles.elapsed}`}>
                {formatElapsed(elapsedSec)}
              </span>
            </>
          ) : (
            <span className="micro-label">Standby</span>
          )}
        </div>
      </div>

      {/* Channel status — one word per stream */}
      <div className={styles.statusRow}>
        {channels.map(({ name, status }) => (
          <span key={name} className="micro-label">
            {name}
            <span aria-hidden="true" className={styles.statusSep}>
              /
            </span>
            <span className={stateClass(status)}>{statusLabel(status)}</span>
            {status === "error" && (
              <span
                aria-hidden="true"
                className={`abd-hazard ${styles.faultStripe}`}
              />
            )}
          </span>
        ))}
      </div>

      <button className="btn btn--primary px-8" onClick={handlePlay}>
        {playing ? "Stop radio" : "Start radio"}
      </button>

      {/* Station selector */}
      <div className={styles.stationField}>
        <span className="micro-label" id="lofi-station-label">
          Station
        </span>
        <div
          className="segmented"
          role="radiogroup"
          aria-labelledby="lofi-station-label"
          ref={stationSlider}
        >
          <div className="segmented-thumb" />
          {LOFI_STATIONS.map((s, i) => (
            <button
              key={s.url}
              data-active={i === stationIdx}
              className="segmented-item"
              onClick={() => handleStationChange(i)}
              role="radio"
              aria-checked={i === stationIdx}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* volume sliders — hidden on Safari where volume is not programmable */}
      {isSafari ? (
        <p className={styles.notice}>
          Per-channel volume is not available in Safari. Use the device volume
          control.
        </p>
      ) : (
        <div className={styles.sliders}>
          <div className={styles.sliderGroup}>
            <label className="field-label" htmlFor="lofi-vol">
              Lo-fi volume
            </label>
            <input
              id="lofi-vol"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={lofiVol}
              onChange={handleLofiVol}
              className="range"
            />
            <span className={styles.sliderValue}>
              {Math.round(lofiVol * 100)}%
            </span>
          </div>

          <div className={styles.sliderGroup}>
            <label className="field-label" htmlFor="atc-vol">
              ATC volume
            </label>
            <input
              id="atc-vol"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={atcVol}
              onChange={handleAtcVol}
              className="range"
            />
            <span className={styles.sliderValue}>
              {Math.round(atcVol * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Source credits */}
      <div className={styles.credits}>
        <span className={styles.creditItem}>
          Music /{" "}
          <a
            href={station.creditUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {station.credit}
          </a>
        </span>
        <span className={styles.creditSep} aria-hidden="true">
          &middot;
        </span>
        <span className={styles.creditItem}>
          ATC /{" "}
          <a
            href={ATC_SOURCE.creditUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ATC_SOURCE.credit}
          </a>{" "}
          ({ATC_SOURCE.label})
        </span>
      </div>
    </div>
  );
}
