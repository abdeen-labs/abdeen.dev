import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import TwoFactorQR from './TwoFactorQR';

export const metadata: Metadata = {
  title: '2FA QR Generator',
  description:
    'Converts TOTP and HOTP secrets or otpauth:// URIs into QR codes for Google Authenticator, Authy, Yubico Authenticator, and other authenticator apps.',
  alternates: { canonical: 'https://abdeen.dev/2fa' },
  openGraph: {
    title: '2FA QR Generator · Abdeen Labs',
    description:
      'Turn TOTP and HOTP secrets into QR codes ready for an authenticator app.',
    url: 'https://abdeen.dev/2fa',
  },
};

export default function TwoFactorQRPage() {
  return (
    <ToolPageShell
      wide
      eyebrow="REF / 2FA"
      currentPath="/2fa"
      title="2FA QR Generator"
      description="Converts a TOTP or HOTP secret, or a pasted otpauth:// URI, into a QR code ready for your authenticator app."
    >
      <TwoFactorQR />
    </ToolPageShell>
  );
}
