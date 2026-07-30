import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import PasswordGenerator from './PasswordGenerator';

export const metadata: Metadata = {
  title: 'Password Generator',
  description:
    'Generate memorable passwords in the classic Apple Keychain format, or diceware passphrases from the EFF Large and BIP-39 word lists. Each result reports its entropy in bits. Generation runs on-device: Storage / NONE · Egress / 0.',
  alternates: { canonical: 'https://abdeen.dev/pwgen' },
  openGraph: {
    title: 'Password Generator | abdeen.dev',
    description:
      'Memorable passwords and diceware passphrases, generated on-device. Entropy stated per result. Storage / NONE · Egress / 0.',
    url: 'https://abdeen.dev/pwgen',
  },
};

export default function PasswordGeneratorPage() {
  return (
    <ToolPageShell
      wide
      eyebrow="REF / PWGEN"
      currentPath="/pwgen"
      title="Password Generator"
      description="Generate memorable passwords or diceware passphrases. Each result reports its entropy in bits. Generation runs on-device — Storage / NONE · Egress / 0."
    >
      <PasswordGenerator />
    </ToolPageShell>
  );
}
