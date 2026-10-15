import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import PomodoroTimer from './PomodoroTimer';

export const metadata: Metadata = {
  title: 'Pomodoro Timer',
  description:
    'A clean, no-nonsense Pomodoro timer. Set your work and break lengths, start the clock, and keep track of your finished sessions.',
  alternates: { canonical: 'https://abdeen.dev/pomodoro' },
  openGraph: {
    title: 'Pomodoro Timer · Abdeen Labs',
    description:
      'Interval timer with work and break durations and a running session tally.',
    url: 'https://abdeen.dev/pomodoro',
  },
};

export default function PomodoroPage() {
  return (
    <ToolPageShell
      eyebrow="REF / POMODORO"
      currentPath="/pomodoro"
      title="Pomodoro Timer"
      description="Interval timer for focused work. Set work and break durations, start the countdown, and count completed sessions."
    >
      <PomodoroTimer />
    </ToolPageShell>
  );
}
