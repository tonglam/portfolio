"use client";

import { useEffect, useState } from "react";

/**
 * A custom hook for creating a typewriter effect
 * @param {string[]} lines - Array of text lines to animate typing
 * @param {number} typingSpeed - Typing speed in milliseconds (default: 30ms)
 * @returns {Object} Object containing the current state of the typing animation
 * @returns {string[]} displayedCode - Array of partially typed lines
 * @returns {boolean} isTyping - Whether the animation is still ongoing
 * @returns {number} currentLine - Current line index being typed
 * @returns {number} currentChar - Current character index being typed
 */
export function useTypewriter(lines, typingSpeed = 30) {
  const [isTyping, setIsTyping] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedCode, setDisplayedCode] = useState(
    Array(lines.length).fill("")
  );

  useEffect(() => {
    if (!isTyping) return;

    const typingInterval = setInterval(() => {
      if (currentLine < lines.length) {
        if (currentChar < lines[currentLine].length) {
          setDisplayedCode((prev) => {
            const newCode = [...prev];
            newCode[currentLine] = lines[currentLine].substring(
              0,
              currentChar + 1
            );
            return newCode;
          });
          setCurrentChar((prev) => prev + 1);
        } else {
          setCurrentLine((prev) => prev + 1);
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
