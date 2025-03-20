'use client';

import type { TypewriterOptions, TypewriterResult } from '@/types/hooks/hooks.type';
import { useEffect, useState } from 'react';

/**
 * A custom hook for creating a typewriter effect
 * @param {string[]} lines - Array of text lines to animate typing
 * @param {TypewriterOptions} options - Configuration options
 * @returns {TypewriterResult} Object containing the current state and controls of the typing animation
 * @throws {Error} If lines array is empty
 */
export function useTypewriter(
  lines: string[],
  { typingSpeed = 30, startDelay = 0 }: TypewriterOptions = {}
): TypewriterResult {
  if (!Array.isArray(lines) || lines.length === 0) {
    throw new Error('Lines array must be non-empty');
  }

  if (typingSpeed < 0) {
    throw new Error('Typing speed must be non-negative');
  }

  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [currentChar, setCurrentChar] = useState<number>(0);
  const [displayedCode, setDisplayedCode] = useState<string[]>(Array(lines.length).fill(''));

  const reset = (): void => {
    setIsTyping(true);
    setCurrentLine(0);
    setCurrentChar(0);
    setDisplayedCode(Array(lines.length).fill(''));
  };

  useEffect(() => {
    if (!isTyping) return;

    // Handle initial delay
    const initialDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentLine < lines.length) {
          if (currentChar < lines[currentLine].length) {
            setDisplayedCode(prev => {
              const newCode = [...prev];
              newCode[currentLine] = lines[currentLine].substring(0, currentChar + 1);
              return newCode;
            });
            setCurrentChar(prev => prev + 1);
          } else {
            setCurrentLine(prev => prev + 1);
            setCurrentChar(0);
          }
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }, startDelay);

    return () => clearTimeout(initialDelay);
  }, [isTyping, currentLine, currentChar, lines, typingSpeed, startDelay]);

  return {
    displayedCode,
    isTyping,
    currentLine,
    currentChar,
    reset,
  };
}

export default useTypewriter;
