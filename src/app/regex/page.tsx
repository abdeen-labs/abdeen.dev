import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import RegexTester from './RegexTester';

export const metadata: Metadata = {
  title: 'Regex Tester',
  description:
    'Test regular expressions live against sample text—with match highlighting, capture group breakdowns, find-and-replace previews, and a quick syntax reference.',
  alternates: { canonical: 'https://abdeen.dev/regex' },
  openGraph: {
    title: 'Regex Tester · Abdeen Labs',
    description:
      'Test a regular expression against sample text with live matches, capture groups, and a replacement preview.',
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
      description="Test a pattern against sample text with live highlighting, capture groups, and a replacement preview."
    >
      <RegexTester />
    </ToolPageShell>
  );
}
