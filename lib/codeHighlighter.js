/**
 * Highlight syntax in code snippets according to a Dracula-inspired theme
 * @param {string} line - Line of code to highlight
 * @returns {string} HTML string with syntax highlighting
 */
export function highlightCodeSyntax(line) {
  if (!line) return "";

  // Keywords
  line = line.replace(
    /\b(const|function|return|this)\b/g,
    '<span class="text-[#ff79c6] dark:text-[#ff79c6]">$1</span>'
  );

  // Values
  line = line.replace(
    /\b(true|false)\b/g,
    '<span class="text-[#bd93f9] dark:text-[#bd93f9]">$1</span>'
  );

  // Strings
  line = line.replace(
    /'([^']*)'/g,
    "<span class=\"text-[#f1fa8c] dark:text-[#f1fa8c]\">'$1'</span>"
  );

  // Operators
  line = line.replace(
    /(&amp;&amp;|>=)/g,
    '<span class="text-[#ff79c6] dark:text-[#ff79c6]">$1</span>'
  );

  // Properties
  line = line.replace(
    /\b(name|skills|hardWorker|quickLearner|problemSolver|hireable|length)\b(?!['"])/g,
    '<span class="text-[#8be9fd] dark:text-[#8be9fd]">$1</span>'
  );

  return line;
}

/**
 * Theme colors for reference
 */
export const draculaTheme = {
  background: "#282a36",
  currentLine: "#44475a",
  foreground: "#f8f8f2",
  comment: "#6272a4",
  cyan: "#8be9fd",
  green: "#50fa7b",
  orange: "#ffb86c",
  pink: "#ff79c6",
  purple: "#bd93f9",
  red: "#ff5555",
  yellow: "#f1fa8c",
};

export default highlightCodeSyntax;
