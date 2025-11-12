'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md border border-border bg-card animate-pulse"></div>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-md border border-border bg-background hover:bg-accent transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
      aria-label="Cambiar tema"
    >
      {theme === 'dark' ? (
        <span className="text-lg">🌞</span>
      ) : (
        <span className="text-lg">🌙</span>
      )}
    </button>
  );
}