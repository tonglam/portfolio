'use client';

import { useEffect, useState } from 'react';

/**
 * TypeWriter hook return type
 */
interface TypewriterResult {
  displayedCode: string[];
  isTyping: boolean;
  currentLine: number;
  currentChar: number;
}

/**
 * A custom hook for creating a typewriter effect
 * @param {string[]} lines - Array of text lines to animate typing
 * @param {number} typingSpeed - Typing speed in milliseconds (default: 30ms)
 * @returns {TypewriterResult} Object containing the current state of the typing animation
 */
export function useTypewriter(lines: string[], typingSpeed: number = 30): TypewriterResult {
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [currentChar, setCurrentChar] = useState<number>(0);
  const [displayedCode, setDisplayedCode] = useState<string[]>(Array(lines.length).fill(''));

  useEffect(() => {
    if (!isTyping) return;

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
  }, [isTyping, currentLine, currentChar, lines, typingSpeed]);

  return {
    displayedCode,
    isTyping,
    currentLine,
    currentChar,
  };
}

export default useTypewriter;
