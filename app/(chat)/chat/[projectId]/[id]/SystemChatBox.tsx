"use client";

import React, { useEffect } from "react";
import RenderCode from "@/app/_components/(chat)/RenderCode";

const parseMessageToComponents = (message: string) => {
  const renderCodeRegex = /<RenderCode filename='([^']+)'>/g;
  const endCodeTag = "</RenderCode>";

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  let match;
  while ((match = renderCodeRegex.exec(message)) !== null) {
    const start = match.index;
    const filename = match[1];
    const codeStart = renderCodeRegex.lastIndex;

    // Add content before <RenderCode> as normal text
    if (start > lastIndex) {
      const beforeCode = message.slice(lastIndex, start).trim();
      if (beforeCode) {
        elements.push(
          <p key={`text-${start}`} className="mb-4 whitespace-pre-wrap">
            {beforeCode}
          </p>
        );
      }
    }

    // Look for the closing </RenderCode>
    const endIndex = message.indexOf(endCodeTag, codeStart);
    let codeContent: string;

    if (endIndex !== -1) {
      // Proper closing tag found
      codeContent = message.slice(codeStart, endIndex).trim();
      lastIndex = endIndex + endCodeTag.length;
    } else {
      // No closing tag, grab till end
      codeContent = message.slice(codeStart).trim();
      lastIndex = message.length;
    }

    elements.push(
      RenderCode(codeContent, filename, start)
    );
  }

  // Remaining content after last code block
  if (lastIndex < message.length) {
    const remaining = message.slice(lastIndex).trim();
    if (remaining) {
      elements.push(
        <p key="text-end" className="mb-4 whitespace-pre-wrap">
          {remaining}
        </p>
      );
    }
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
