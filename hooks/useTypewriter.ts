'use client';

import { useEffect, useRef, useState } from 'react';

interface TypewriterResult {
  displayedCode: string[];
  isTyping: boolean;
  currentLine: number;
  currentChar: number;
  reset: () => void;
}

interface TypewriterOptions {
  typingSpeed?: number;
  startDelay?: number;
}

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

  const linesRef = useRef(lines);
  const currentLineRef = useRef(currentLine);
  const currentCharRef = useRef(currentChar);
  const isTypingRef = useRef(isTyping);

  useEffect(() => {
    currentLineRef.current = currentLine;
    currentCharRef.current = currentChar;
    isTypingRef.current = isTyping;
    linesRef.current = lines;
  }, [currentLine, currentChar, isTyping, lines]);

  const reset = (): void => {
    setIsTyping(true);
    setCurrentLine(0);
    setCurrentChar(0);
    setDisplayedCode(Array(lines.length).fill(''));
  };

  useEffect(() => {
    if (!isTyping) return;

    let typingInterval: NodeJS.Timeout;

    // Handle initial delay
    const initialDelay = setTimeout(() => {
      typingInterval = setInterval(() => {
        const curLine = currentLineRef.current;
        const curChar = currentCharRef.current;
        const curLines = linesRef.current;

        if (curLine < curLines.length) {
          if (curChar < curLines[curLine].length) {
            // Type the next character
            setDisplayedCode(prev => {
              const newCode = [...prev];
              newCode[curLine] = curLines[curLine].substring(0, curChar + 1);
              return newCode;
            });
            setCurrentChar(prev => prev + 1);
          } else {
            // Store the completed line before moving to the next
            setDisplayedCode(prev => {
              const newCode = [...prev];
              newCode[curLine] = curLines[curLine];
              return newCode;
            });

            // Check if we've reached the end of all lines
            if (curLine === curLines.length - 1) {
              setIsTyping(false);
              clearInterval(typingInterval);
            } else {
              // Move to the next line
              setCurrentLine(prev => prev + 1);
              setCurrentChar(0);
            }
          }
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, typingSpeed);
    }, startDelay);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(typingInterval);
    };
  }, [typingSpeed, startDelay, isTyping]);

  return {
    displayedCode,
    isTyping,
    currentLine,
    currentChar,
    reset,
  };
}

export default useTypewriter;
