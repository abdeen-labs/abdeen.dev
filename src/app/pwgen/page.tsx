import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import PasswordGenerator from './PasswordGenerator';

export const metadata: Metadata = {
  title: 'Password Generator',
  description:
    'Generate memorable passwords in the classic Apple Keychain format, or diceware passphrases from the EFF Large and BIP-39 word lists. Each result reports its entropy in bits.',
  alternates: { canonical: 'https://abdeen.dev/pwgen' },
  openGraph: {
    title: 'Password Generator · Abdeen Labs',
    description:
      'Memorable passwords and diceware passphrases with an entropy estimate for every result.',
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
      description="Generate memorable passwords or diceware passphrases. Each result reports its entropy in bits."
    >
      <div className="tool-note" role="note">
        <span className="page-kicker tool-note__kicker">A quick note</span>
        <div className="tool-note__grid">
          <div>
            <h3>Why this exists</h3>
            <p>
              Apple used to make passwords in this format. I missed that
              Keychain generator, so I rebuilt it here.
            </p>
          </div>
          <div>
            <h3>Before you use one</h3>
            <p>
              This mode is mostly here for nostalgia. For an account you care
              about, use your password manager&apos;s generator instead.
            </p>
          </div>
        </div>
      </div>
      <PasswordGenerator />
    </ToolPageShell>
  );
}
