import Link from "next/link";
import AppleLogo from "@/components/AppleLogo";
import BrewCommand from "@/components/BrewCommand";
import FadeInWrapper from "@/components/FadeInWrapper";
import SectionHeader from "@/components/SectionHeader";
import styles from "./encore.module.css";

const VERSION = "1.0";
const DMG_URL = `https://updates.abdeen.industries/encore/Encore-${VERSION}.dmg`;
const REPO_URL = "https://github.com/abdeen-labs/encore";
const BREW_CMD = "brew install --cask abdeen-labs/tap/encore";

const modes = [
  {
    number: "01",
    mode: "Speak",
    label: "Text to speech",
    detail: "Write the lines, cast a voice, and perform. Every take is kept with the script and settings it was made with.",
  },
  {
    number: "02",
    mode: "Clone",
    label: "Clone a voice",
    detail: "Drop in any recording or record a few sentences, trim it to the best 5 to 15 seconds, and save it.",
  },
  {
    number: "03",
    mode: "Design",
    label: "Design a voice",
    detail: "Describe a voice in words and audition several at once.",
  },
  {
    number: "04",
    mode: "Perform",
    label: "Perform a script",
    detail: "Import a screenplay or labeled script (.txt, .md, .fountain, or .pdf), cast each speaker, and perform the whole scene. Change one line and only that line is generated again.",
  },
  {
    number: "05",
    mode: "Change",
    label: "Change a voice",
    detail: "Re-voice a recording in one of your voices while keeping its words, timing, and delivery.",
  },
  {
    number: "06",
    mode: "Transcribe",
    label: "Audio to text",
    detail: "Transcribe audio or video with sentence or word timings, then export plain text, SRT, WebVTT, or JSON.",
  },
];

const facts = [
  { value: "16", label: "Models, downloaded as needed" },
  { value: "79 MB–5 GB", label: "From transcriber to studio voice" },
  { value: ".encorevoice", label: "Voices you can share" },
];

const requirements = [
  { label: "System", value: "macOS 27 or later" },
  { label: "Architecture", value: "Apple Silicon" },
  { label: "License", value: "MIT" },
];

/** Bar heights for the hero take, in percent of the waveform's height. */
const takeBars = [
  28, 46, 64, 38, 72, 54, 30, 18, 42, 68, 84, 58, 36, 22, 48, 76, 62, 40,
  26, 52, 70, 44, 24, 14, 34, 56, 38, 20,
];
/** How many bars of the take have played. */
const PLAYED = 11;

function DownloadButton({ location }: { location: string }) {
  return (
    <a
      href={DMG_URL}
      className="btn btn--primary"
      data-umami-event="download"
      data-umami-event-app="encore"
      data-umami-event-location={location}
    >
      <AppleLogo />
      Download {VERSION} for macOS
    </a>
  );
}

/** A compact depiction of Encore itself: a line of script and the take
 * performed from it, in the same built-visual language as the Frost and
 * Hush heroes. It inherits the page theme so Encore remains the subject. */
function EncoreVisual() {
  return (
    <figure
      className={styles.visual}
      role="img"
      aria-label="A line of script in Encore and the take performed from it, partway through playback"
    >
      <span className={styles.visualCode} aria-hidden="true">
        TAKE
      </span>
      <div className={styles.take} aria-hidden="true">
        <div className={styles.takeHeader}>
          <span>Studio</span>
          <span>Take 04</span>
        </div>
        <p className={styles.takeLine}>
          The house lights dim. A single spot finds the center of the stage
          <span className={styles.period}>.</span>
        </p>
        <div className={styles.takeWave}>
          {takeBars.map((height, index) => (
            <span
              key={index}
              className={index < PLAYED ? styles.played : undefined}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className={styles.takeFooter}>
          <span>Imogen · 0:04</span>
          <span>On this Mac</span>
        </div>
      </div>
    </figure>
  );
}

function ModeList() {
  return (
    <ol className={styles.modes}>
      {modes.map((mode) => (
        <li key={mode.number}>
          <span className={styles.modeNumber} aria-hidden="true">
            {mode.number}
          </span>
          <span className={styles.modeCopy}>
            <span>{mode.mode}</span>
            <strong>{mode.label}</strong>
            <small>{mode.detail}</small>
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function Encore() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 pb-20 pt-4 md:gap-20 md:pb-28 md:pt-10">
      {/* Hero */}
      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <FadeInWrapper direction="up" eager>
          <div className="flex flex-col gap-5">
            <span className="micro-label">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 bg-signal-identity"
              />
              macOS App · Abdeen Labs
            </span>
            <h1 className="text-h1 md:text-display">
              Encore<span className="text-signal-identity">.</span>
            </h1>
            <p className="max-w-xl text-body text-ink-secondary md:text-lede">
              Text to speech, voice cloning, voice design, voice changing,
              multi-speaker scripts, and transcription, all on your own Mac.
              Nothing you type, record, or generate leaves your computer.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-3">
              <DownloadButton location="hero" />
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--quiet"
                data-umami-event="github"
                data-umami-event-app="encore"
                data-umami-event-location="hero"
              >
                View source
              </a>
            </div>
            <p className="micro-label">
              Free · Open source
            </p>
          </div>
        </FadeInWrapper>

        <FadeInWrapper direction="up" delay={0.08} eager>
          <EncoreVisual />
        </FadeInWrapper>
      </section>

      {/* What it does */}
      <section aria-label="What Encore does">
        <FadeInWrapper direction="up">
          <SectionHeader label="In the studio" count={modes.length} />
        </FadeInWrapper>
        <FadeInWrapper direction="up" delay={0.05}>
          <ModeList />
        </FadeInWrapper>
      </section>

      {/* Facts */}
      <FadeInWrapper direction="up">
        <section className={styles.facts} aria-label="Encore facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </section>
      </FadeInWrapper>

      {/* On your machine */}
      <FadeInWrapper direction="up">
        <section className={styles.local} aria-labelledby="encore-local-title">
          <SectionHeader label="On your machine" />
          <div className={styles.localBody}>
            <h2 id="encore-local-title">Nothing you make leaves your Mac.</h2>
            <div className={styles.localFacts}>
              <span>No account</span>
              <span>No cloud</span>
              <span>Models from Hugging Face</span>
            </div>
          </div>
        </section>
      </FadeInWrapper>

      {/* Requirements */}
      <FadeInWrapper direction="up">
        <section className={styles.requirements} aria-label="Requirements">
          {requirements.map((requirement) => (
            <div key={requirement.label}>
              <span>{requirement.label}</span>
              <strong>{requirement.value}</strong>
            </div>
          ))}
        </section>
      </FadeInWrapper>

      {/* Download */}
      <FadeInWrapper direction="up">
        <section
          aria-label="Download Encore"
          className="border-t border-hairline pt-8 md:pt-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-8">
            <div className="flex max-w-md flex-col gap-3">
              <h2 className="micro-label">
                <span aria-hidden="true" className="text-signal-identity">
                  /
                </span>
                Download
              </h2>
              <p className="text-body text-ink-secondary">
                Drag Encore to Applications, then download the models you
                need as you go, from Hugging Face. Encore keeps itself up to
                date.
              </p>
              <p className="micro-label">Version {VERSION} · macOS 27+ · MIT</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <Link
                  href="/privacy#encore"
                  className="chrome-link font-mono text-control"
                >
                  Privacy
                </Link>
              </div>
            </div>
            <div className={`flex flex-col items-start gap-5 ${styles.install}`}>
              <DownloadButton location="closing" />
              <BrewCommand command={BREW_CMD} />
            </div>
          </div>
        </section>
      </FadeInWrapper>
    </div>
  );
}
