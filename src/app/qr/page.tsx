import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import QRGenerator from './QRGenerator';

export const metadata: Metadata = {
  title: 'QR Generator',
  description:
    'Encode links, WiFi credentials, email, and phone numbers as QR codes. Customize the dots, colors, and gradients, then export a PNG. The content stays on this device.',
  alternates: { canonical: 'https://abdeen.dev/qr' },
  openGraph: {
    title: 'QR Generator · Abdeen Labs',
    description:
      'Encode links, WiFi, email, and phone numbers as QR codes. Customize the design and export a PNG. The content stays on this device.',
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
      description="Encode a link, WiFi credential, email, or phone number as a scannable code. Customize the design, check the preview, and export a PNG. The content stays on this device."
    >
      <QRGenerator />
    </ToolPageShell>
  );
}
