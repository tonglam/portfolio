'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] hover:from-[#6366F1] hover:to-[#3B82F6] dark:hover:from-[#EC4899] dark:hover:to-[#F472B6] text-white text-sm py-6 flex items-center justify-center"
    >
      {pending ? 'SENDING...' : 'SEND MESSAGE'}
    </Button>
  );
}
