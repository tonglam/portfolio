'use client';

import type { ChangeEvent } from 'react';

interface FormTextAreaProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  autoComplete?: string;
}

export function FormTextArea({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  rows = 5,
  autoComplete,
}: FormTextAreaProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="w-full bg-white dark:bg-[#0F172A] border border-gray-300 dark:border-gray-700 rounded-md p-2 md:p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#38BDF8] text-sm"
      ></textarea>
    </div>
  );
}
