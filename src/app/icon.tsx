import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Favicon — a build-time render of the Key seal (BRAND.md → The Seal).
 * Sanctioned: raster icons are renders of the live Seal component, never
 * traced artwork. Ramp literals appear here because the artifact is
 * standalone — there is no cascade to carry roles.
 */

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Key geometry at 32px: 26% chamfer, 1px lacquer hairline (floored),
// mark ink at 0.32 × plate with the 0.168em optical shift.
const CUT = 32 * 0.26;
const LINE = 1;
const MARK_SIZE = (32 * 0.32) / 0.883;

const chamfer = (inset: number, cut: number) =>
  `polygon(${cut}px ${inset}px, ${32 - inset}px ${inset}px, ${32 - inset}px ${
    32 - inset
  }px, ${inset}px ${32 - inset}px, ${inset}px ${cut}px)`;

export default async function Icon() {
  const arefRuqaa = await readFile(
    path.join(process.cwd(), 'public/fonts/axis/static/ArefRuqaa-Bold.ttf'),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          // Lacquer plate, clipped to the Key silhouette — reads as the
          // hairline once the field covers all but 1px of it.
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
            // The sunken field (pitch-900), inset one hairline.
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
              // The ink sits low in its em box — raise by 0.168em.
              marginTop: -(MARK_SIZE * 0.168 * 2),
            }}
          >
            عابدين
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Aref Ruqaa',
          data: arefRuqaa,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );
}
