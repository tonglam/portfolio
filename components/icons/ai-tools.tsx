import { IconProps } from '@/types/icon.type';
import Image from 'next/image';
import { useState } from 'react';

// Map of AI tool names to their image paths
const AI_TOOL_PATHS = {
  V0: 'https://v0.dev/assets/icon.svg',
  BoltNew: 'https://bolt.new/static/favicon.svg',
  Cursor: 'https://www.cursor.com/favicon.ico',
  Windsurf: 'https://codeium.com/favicon.svg',
  MCP: 'https://www.claudemcp.com/logo.png',
};

// Define types
export type AIToolName = keyof typeof AI_TOOL_PATHS;

interface AIToolIconProps extends Omit<IconProps, 'size'> {
  tool: AIToolName;
  size?: number;
}

// Main component that renders any AI tool icon directly
export function AIToolIcon({ className = '', tool, size = 24 }: AIToolIconProps) {
  const [hasError, setHasError] = useState(false);
  const sizeStyle = `${size}px`;

  return (
    <div className={`relative ${className}`} style={{ width: sizeStyle, height: sizeStyle }}>
      {!hasError ? (
        <Image
          src={AI_TOOL_PATHS[tool]}
          alt={`${tool} icon`}
          fill
          className="object-contain"
          sizes={sizeStyle}
          onError={() => setHasError(true)}
          unoptimized
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
          <span className="text-xs">{tool.substring(0, 2)}</span>
        </div>
      )}
    </div>
  );
}

// Export individual icon components for backward compatibility
export function V0Icon({ className }: IconProps) {
  return <AIToolIcon tool="V0" className={className} />;
}

export function BoltNewIcon({ className }: IconProps) {
  return <AIToolIcon tool="BoltNew" className={className} />;
}

export function CursorIcon({ className }: IconProps) {
  return <AIToolIcon tool="Cursor" className={className} />;
}

export function WindsurfIcon({ className }: IconProps) {
  return <AIToolIcon tool="Windsurf" className={className} />;
}

export function MCPIcon({ className }: IconProps) {
  return <AIToolIcon tool="MCP" className={className} />;
}
