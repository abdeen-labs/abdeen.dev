import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import TwoFactorQR from './TwoFactorQR';

export const metadata: Metadata = {
  title: '2FA QR Generator',
  description:
    'Converts TOTP and HOTP secrets or otpauth:// URIs into authenticator-ready QR codes. Encoding runs on the device — Storage / NONE · Egress / 0. Scans into Google Authenticator, Authy, and Yubico Authenticator.',
  alternates: { canonical: 'https://abdeen.dev/2fa' },
  openGraph: {
    title: '2FA QR Generator · Abdeen Labs',
    description:
      'TOTP and HOTP secrets converted to authenticator QR codes, entirely on the device. Storage / NONE · Egress / 0.',
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
      description="Converts a TOTP or HOTP secret, or a pasted otpauth:// URI, into an authenticator-ready QR code. The secret never leaves this device."
    >
      <TwoFactorQR />
    </ToolPageShell>
  );
}
