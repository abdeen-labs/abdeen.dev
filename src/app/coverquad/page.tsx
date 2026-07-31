import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import CoverQuad from './CoverQuad';

export const metadata: Metadata = {
  title: 'CoverQuad',
  description:
    'Apple retired the classic 2×2 playlist cover. CoverQuad rebuilds it from four album covers — upload files or search the Cover Art Archive — and exports one square PNG at up to 3000 px. No account.',
  alternates: { canonical: 'https://abdeen.dev/coverquad' },
  openGraph: {
    title: 'CoverQuad · Abdeen Labs',
    description:
      'Rebuild the classic 2×2 playlist cover. Four covers in, one square PNG out at up to 3000 px.',
    url: 'https://abdeen.dev/coverquad',
  },
};

export default function CoverQuadPage() {
  return (
    <ToolPageShell
      wide
      eyebrow="REF / QUAD"
      currentPath="/coverquad"
      title="CoverQuad"
      description={
        'Apple retired the 2×2 playlist cover. CoverQuad rebuilds it: four covers in, one square PNG out at up to 3000 px. Upload files or search the Cover Art Archive; covers fetch through the site proxy and the export renders locally.'
      }
    >
      <CoverQuad />
    </ToolPageShell>
  );
}
