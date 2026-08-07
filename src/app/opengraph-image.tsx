import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { MARK, SEAL_KEY, SEAL_KEY_MARK } from '@/lib/seal-geometry';

/**
 * OG card — the dark canonical page: Key seal + wordmark lockup, the
 * positioning line as macro display, and the privacy promise below.
 * Ramp literals appear because the artifact is standalone.
 * The Key is one inline SVG built from the generated geometry (Satori
 * cannot shape Arabic); the remaining text uses static font instances
 * (Satori cannot ingest variable TTFs).
 */

export const alt = 'Abdeen Labs · Private software. Clear boundaries.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Key rendered at 72px via the 0–40 viewBox; the mark transform is in
// viewBox units, so it holds at any pixel size.
const SEAL = 72;

export default async function OGImage() {
  const [schibsted, geistMono] = await Promise.all([
    readFile(
      path.join(
        process.cwd(),
        'public/fonts/nightfield/static/SchibstedGrotesk.ttf',
      ),
    ),
    readFile(
      path.join(process.cwd(), 'public/fonts/nightfield/static/GeistMono.ttf'),
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
          background: '#000704',
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
            {/* Key seal — one inline SVG from the generated geometry: sunken
                field, Accent hairline ring, and the mark's painted outline. */}
            <svg
              width={SEAL}
              height={SEAL}
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={SEAL_KEY.fieldPath} fill="#00100A" />
              <path
                d={SEAL_KEY.ringPathEvenOdd}
                fillRule="evenodd"
                fill="#1FB977"
              />
              <g transform={SEAL_KEY_MARK.transform}>
                <path d={MARK.d} fill="#F0FAF5" />
              </g>
            </svg>
            <div
              style={{ width: 1, height: 44, background: '#043923', display: 'flex' }}
            />
            <span
              style={{
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: 4.84,
                color: '#F0FAF5',
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
              color: '#86A998',
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
              color: '#F0FAF5',
            }}
          >
            PRIVATE SOFTWARE.
          </span>
          <span
            style={{
              fontFamily: 'Schibsted Grotesk',
              fontWeight: 800,
              fontSize: 104,
              lineHeight: 0.92,
              letterSpacing: -5.7,
              color: '#86A998',
            }}
          >
            CLEAR BOUNDARIES.
          </span>
          <div
            style={{
              width: 180,
              height: 2,
              background: '#1FB977',
              marginTop: 40,
              display: 'flex',
            }}
          />
        </div>

        {/* Property and direct privacy promise. */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <span style={{ fontSize: 30, fontWeight: 500, color: '#F0FAF5' }}>
            abdeen.dev
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: 2,
              color: '#86A998',
            }}
          >
            NO ACCOUNT · OPEN SOURCE
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Schibsted Grotesk', data: schibsted, weight: 800, style: 'normal' },
        { name: 'Geist Mono', data: geistMono, weight: 500, style: 'normal' },
      ],
    },
  );
}
