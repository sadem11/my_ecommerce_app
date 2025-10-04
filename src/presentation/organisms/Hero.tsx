// src/presentation/organisms/Hero.tsx
'use client';

import React from 'react';

export default function Hero() {
  const handleStart = () => {
    const main = document.getElementById('main-content');
    if (main) {
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
      (main as HTMLElement).focus?.();
    }
  };

  return (
    <section className="hero" aria-label="Hero">
      {/* Overlay content */}
      <div className="hero__overlay">
       
        <button
          className="hero__start"
          onClick={handleStart}
          aria-label="Start shopping"
          type="button"
        >
          Start
        </button>
      </div>
    </section>
  );
}
