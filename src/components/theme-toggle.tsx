'use client';

import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const order = ['system', 'light', 'dark'] as const;
const emptySubscribe = () => () => undefined;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const current =
    mounted && order.includes(theme as (typeof order)[number])
      ? (theme as (typeof order)[number])
      : 'system';
  const next = order[(order.indexOf(current) + 1) % order.length];
  const Icon = current === 'light' ? Sun : current === 'dark' ? Moon : Laptop;

  return (
    <button
      className="icon-button theme-toggle"
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${current}. Switch to ${next}.`}
      title={`Theme: ${current}`}
    >
      <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
      <span className="theme-label">{mounted ? current : 'system'}</span>
    </button>
  );
}
