'use client';

import { track } from '@vercel/analytics';
import type { ComponentProps } from 'react';

type Props = ComponentProps<'a'> & { event: string };

export function TrackedLink({ event, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={clickEvent => {
        track(event);
        onClick?.(clickEvent);
      }}
    />
  );
}
