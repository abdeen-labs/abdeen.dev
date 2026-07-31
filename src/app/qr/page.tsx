import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import QRGenerator from './QRGenerator';

export const metadata: Metadata = {
  title: 'QR Generator',
  description:
    'Encode links, WiFi credentials, email, and phone numbers as QR codes. Set module shape, colors, and gradients. Export PNG. The payload never leaves the browser.',
  alternates: { canonical: 'https://abdeen.dev/qr' },
  openGraph: {
    title: 'QR Generator · Abdeen Labs',
    description:
      'Encode links, WiFi, email, and phone numbers as QR codes. Style the modules and export PNG. The payload never leaves the browser.',
    url: 'https://abdeen.dev/qr',
  },
};

export default function QRGeneratorPage() {
  return (
    <ToolPageShell
      wide
      eyebrow="REF / QR"
      currentPath="/qr"
      title="QR Generator"
      description="Encode a link, WiFi credential, email, or phone number as a scannable code. Style the modules, verify the preview, export PNG. Encoding runs in the browser; the payload stays on this device."
    >
      <QRGenerator />
    </ToolPageShell>
  );
}
