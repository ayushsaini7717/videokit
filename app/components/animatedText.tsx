'use client';

import React, { useEffect, useState } from 'react';

export default function TypingText({ text, speed = 50 }:any) {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);
  

  return (
    <p>
      {displayedText}
    </p>
  );
}
