import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import RegexTester from './RegexTester';

export const metadata: Metadata = {
  title: 'Regex Tester',
  description:
    'Execute a regular expression against sample text. Live match highlighting, capture groups, replacement preview, and a syntax reference. Matching runs in the browser; the pattern and text never leave this device.',
  alternates: { canonical: 'https://abdeen.dev/regex' },
  openGraph: {
    title: 'Regex Tester · Abdeen Labs',
    description:
      'Execute a regular expression against sample text. Matches, capture groups, and the replacement preview update live. Nothing leaves the browser.',
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
