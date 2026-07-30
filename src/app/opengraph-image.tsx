import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * OG card — the dark canonical page: Key seal + wordmark lockup, the
 * positioning line as macro display, and the operating boundary as
 * evidence. Ramp literals appear because the artifact is standalone.
 * Fonts are static instances (Satori cannot ingest variable TTFs).
 */

export const alt = 'Abdeen Labs · Defined tasks. Verified output.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Key geometry at 72px: 26% chamfer, hairline scaled with the plate.
const SEAL = 72;
const CUT = SEAL * 0.26;
const LINE = Math.max(1, SEAL / 40);
const MARK_SIZE = (SEAL * 0.32) / 0.883;

const chamfer = (inset: number, cut: number) =>
  `polygon(${cut}px ${inset}px, ${SEAL - inset}px ${inset}px, ${
    SEAL - inset
  }px ${SEAL - inset}px, ${inset}px ${SEAL - inset}px, ${inset}px ${cut}px)`;

export default async function OGImage() {
  const [schibsted, geistMono, arefRuqaa] = await Promise.all([
    readFile(
      path.join(
        process.cwd(),
        'public/fonts/axis/static/SchibstedGrotesk-ExtraBold.ttf',
      ),
    ),
    readFile(
      path.join(process.cwd(), 'public/fonts/axis/static/GeistMono-Medium.ttf'),
    ),
    readFile(
      path.join(process.cwd(), 'public/fonts/axis/static/ArefRuqaa-Bold.ttf'),
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          background: '#0A0B0C',
          fontFamily: 'Geist Mono',
        }}
      >
        {/* Identification row — lockup left, reference code right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Key seal — lacquer hairline, sunken field, live mark */}
            <div
              style={{
                width: SEAL,
                height: SEAL,
                display: 'flex',
                background: '#D01E3A',
                clipPath: chamfer(0, CUT),
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#111316',
                  clipPath: chamfer(LINE, CUT + LINE * 0.41),
                }}
              >
                <span
                  style={{
                    fontFamily: 'Aref Ruqaa',
                    fontWeight: 700,
                    fontSize: MARK_SIZE,
                    lineHeight: 1,
                    color: '#D01E3A',
                    display: 'flex',
                    marginTop: -(MARK_SIZE * 0.168 * 2),
                  }}
                >
                  عابدين
                </span>
              </div>
            </div>
            <div
              style={{ width: 1, height: 44, background: '#2E343C', display: 'flex' }}
            />
            <span
              style={{
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: 4.84,
                color: '#FFFFFF',
              }}
            >
              ABDEEN LABS
            </span>
          </div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: 2,
              color: '#747C88',
            }}
          >
            REF / ABDEEN.DEV
          </span>
        </div>

        {/* Positioning line as macro display; the second line steps its
            ink down a tier — never hollow type. */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: 'Schibsted Grotesk',
              fontWeight: 800,
              fontSize: 104,
              lineHeight: 0.92,
              letterSpacing: -5.7,
              color: '#FFFFFF',
            }}
          >
            DEFINED TASKS.
          </span>
          <span
            style={{
              fontFamily: 'Schibsted Grotesk',
              fontWeight: 800,
              fontSize: 104,
              lineHeight: 0.92,
              letterSpacing: -5.7,
              color: '#8F96A0',
            }}
          >
            VERIFIED OUTPUT.
          </span>
          <div
            style={{
              width: 180,
              height: 2,
              background: '#D01E3A',
              marginTop: 40,
              display: 'flex',
            }}
          />
        </div>

        {/* Evidence row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <span style={{ fontSize: 30, fontWeight: 500, color: '#FFFFFF' }}>
            abdeen.dev
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: 2,
              color: '#747C88',
            }}
          >
            SOURCE / PUBLIC · ACCOUNT / NONE
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Schibsted Grotesk', data: schibsted, weight: 800, style: 'normal' },
        { name: 'Geist Mono', data: geistMono, weight: 500, style: 'normal' },
        { name: 'Aref Ruqaa', data: arefRuqaa, weight: 700, style: 'normal' },
      ],
    },
  );
}
