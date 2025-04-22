"use client";

import React, { useEffect } from "react";
import RenderCode from "@/app/_components/(chat)/RenderCode";

const parseMessageToComponents = (message: string) => {
  const renderCodeRegex = /<RenderCode filename='([^']+)'>/g;
  const endCodeRegex = /<\/RenderCode>/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let inCodeBlock = false;
  let codeContent = "";
  let match;

  while ((match = renderCodeRegex.exec(message)) !== null || (match = endCodeRegex.exec(message)) !== null) {
    const start = match.index;
    
    // Add any text before this code block
    if (start > lastIndex) {
      const beforeCode = message.slice(lastIndex, start).trim();
      if (beforeCode && !inCodeBlock) {
        elements.push(
          <p key={`text-${start}`} className="mb-4 whitespace-pre-wrap">
            {beforeCode}
          </p>
        );
      }
    }

    // Handle opening <RenderCode> tag
    if (match && match[0].startsWith("<RenderCode")) {
      inCodeBlock = true;
      codeContent = ""; // Reset the codeContent when a new code block starts
    }

    // Handle closing </RenderCode> tag
    if (match && match[0] === "</RenderCode>") {
      if (inCodeBlock && codeContent) {
        elements.push(
          RenderCode(codeContent, match[1])
        );
        codeContent = ""; // Reset after rendering code block
      }
      inCodeBlock = false;
    }

    // Accumulate code content between <RenderCode> and </RenderCode>
    if (inCodeBlock) {
      codeContent += message.slice(lastIndex, start);
    }

    lastIndex = start + match[0].length; // Move to the next position after the tag
  }

  // Add any remaining content (if any)
  if (lastIndex < message.length) {
    const remainingText = message.slice(lastIndex).trim();
    if (remainingText) {
      elements.push(
        <p key={`text-end`} className="mb-4 whitespace-pre-wrap">
          {remainingText}
        </p>
      );
    }
  }

  // If content after <RenderCode> is missing </RenderCode>, treat it as code
  if (inCodeBlock && codeContent) {
    elements.push(
      RenderCode(codeContent, "Unknown")
    );
  }

  return elements;
};


const SystemChatBox = ({ message }: { message: string }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const parsed = parseMessageToComponents(message);

  return <div className="mt-8">{parsed}</div>;
};

export default SystemChatBox;
