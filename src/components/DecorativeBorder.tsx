import React from 'react';

interface DecorativeBorderProps {
  color: string;
}

export function DecorativeBorder({ color }: DecorativeBorderProps) {
  return (
    <div className="absolute inset-2 border-2 border-dashed pointer-events-none rounded-lg" style={{ borderColor: color, opacity: 0.25 }} />
  );
}
