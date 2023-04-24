import React from 'react';

interface Props {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

export default function FadeIn({ children, duration = 500, delay = 0 }: Props) {
  return (
    <div
      style={{
        animationName: 'fadeIn',
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {children}
    </div>
  );
}