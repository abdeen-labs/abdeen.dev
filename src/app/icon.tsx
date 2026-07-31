import { ImageResponse } from 'next/og';
import { MARK } from '@/lib/seal-geometry';

/**
 * Favicon — a build-time render of the Key seal (BRAND.md → The Seal).
 * Sanctioned: raster icons are renders of the live Seal component, never
 * traced artwork. Ramp literals appear here because the artifact is
 * standalone — there is no cascade to carry roles. Everything is painted
 * as one SVG: Satori cannot shape Arabic (live type renders disjoined
 * letters) and its nested clip-paths drop the hairline ring, so the mark
 * uses the HarfBuzz-shaped outline from seal-geometry and the ring is an
 * even-odd keyhole path, both in 32px space to keep the hairline at 1px.
 */

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Key geometry at 32px: 26% chamfer, 1px lacquer hairline (floored),
// mark ink at 0.32 × plate, centred on its ink bbox.
const CUT = 32 * 0.26;
const LINE = 1;
const INNER_CUT = CUT + LINE * 0.41;

// Sunken field; paint first, exactly fills the ring's hole.
const FIELD = `M${INNER_CUT} ${LINE}H${32 - LINE}V${32 - LINE}H${LINE}V${INNER_CUT}Z`;
// Lacquer hairline as a true ring (even-odd keyhole); paint after the field.
const RING = `M${CUT} 0H32V32H0V${CUT}Z${FIELD}`;

const [MX0, MY0, MX1, MY1] = MARK.bbox;
const MARK_SCALE = (32 * 0.32) / (MY1 - MY0);
const MARK_TX = 16 - MARK_SCALE * ((MX0 + MX1) / 2);
const MARK_TY = 16 - MARK_SCALE * ((MY0 + MY1) / 2);

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <svg
          width={32}
          height={32}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={FIELD} fill="#0C1017" />
          <path d={RING} fillRule="evenodd" fill="#CE2020" />
          <g
            transform={`translate(${MARK_TX} ${MARK_TY}) scale(${MARK_SCALE})`}
          >
            <path d={MARK.d} fill="#CE2020" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
