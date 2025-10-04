'use client';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      style={{
        padding: '6px 12px',
        border: 'none',
        borderRadius: '6px',
        backgroundColor: '#020303ff',
        color: 'white',
      }}
      {...props}
    >
      {children}
    </button>
  );
}
