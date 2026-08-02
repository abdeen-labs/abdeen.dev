import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import RegexTester from './RegexTester';

export const metadata: Metadata = {
  title: 'Regex Tester',
  description:
    'Test a regular expression against sample text. Live match highlighting, capture groups, replacement preview, and a syntax reference. The pattern and text stay on this device.',
  alternates: { canonical: 'https://abdeen.dev/regex' },
  openGraph: {
    title: 'Regex Tester · Abdeen Labs',
    description:
      'Test a regular expression against sample text with live matches, capture groups, and a replacement preview. Nothing is stored or sent.',
    url: 'https://abdeen.dev/regex',
  },
};

export default function RegexTesterPage() {
  return (
    <ToolPageShell
      wide
      eyebrow="REF / REGEX"
      currentPath="/regex"
      title="Regex Tester"
      description="Test a pattern against sample text with live highlighting, capture groups, and a replacement preview. Matching runs in the browser; the pattern and text stay on this device."
    >
      <RegexTester />
    </ToolPageShell>
  );
}
