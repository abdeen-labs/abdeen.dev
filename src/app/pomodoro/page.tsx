import type { Metadata } from 'next';
import ToolPageShell from '@/components/ToolPageShell';
import PomodoroTimer from './PomodoroTimer';

export const metadata: Metadata = {
  title: 'Pomodoro Timer',
  description:
    'Pomodoro interval timer. Assign work and break durations, start the countdown, and count completed sessions. Runs in the page — no account, 0 egress.',
  alternates: { canonical: 'https://abdeen.dev/pomodoro' },
  openGraph: {
    title: 'Pomodoro Timer | abdeen.dev',
    description:
      'Interval timer with work and break durations and a session tally. Runs in the page — 0 egress.',
    url: 'https://abdeen.dev/pomodoro',
  },
};

export default function PomodoroPage() {
  return (
    <ToolPageShell
      eyebrow="REF / POMODORO"
      currentPath="/pomodoro"
      title="Pomodoro Timer"
      description="Interval timer for focused work. Assign work and break durations, start the countdown, and count completed sessions. Timing and tally stay in this page — 0 egress."
    >
      <PomodoroTimer />
    </ToolPageShell>
  );
}
