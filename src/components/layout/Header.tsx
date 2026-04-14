"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SKOOL_LINK = "https://www.skool.com/ai-marketing-with-deepanshu-3730";

const navLinks = [
  { label: "Guides", href: "/guides" },
  { label: "Topics", href: "/topics" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setDark(isDark);
    applyTheme(isDark);
  }, []);

  function applyTheme(isDark: boolean) {
    const el = document.documentElement;
    if (isDark) {
      el.classList.add("dark");
      el.classList.remove("light");
    } else {
      el.classList.add("light");
      el.classList.remove("dark");
    }
  }

  function toggleDark() {
    const next = !dark;
    setDark(next);
    applyTheme(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'var(--color-bg-white)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <nav className="mx-auto flex h-14 max-w-[var(--max-content)] items-center justify-between px-5">
        <Link href="/" className="text-[17px] font-extrabold tracking-tight" style={{ color: 'var(--color-text)' }}>
          itsdeep.io
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-5 sm:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-[14px] font-medium transition-colors hover:opacity-70" style={{ color: 'var(--color-text-secondary)' }}>
              {link.label}
            </Link>
          ))}
          <a
            href={SKOOL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[6px] px-4 py-1.5 text-[13px] font-bold transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'var(--color-accent)', color: '#1a1a1a' }}
          >
            Join Free
          </a>
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="rounded-[6px] p-1.5 transition-colors hover:opacity-70"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zm8-5a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zm10.657-5.657a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 11-1.061-1.06l1.06-1.061a.75.75 0 011.061 0zm-9.193 9.193a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 11-1.061-1.06l1.06-1.061a.75.75 0 011.061 0zm9.193 0a.75.75 0 01-1.06 0l-1.061-1.06a.75.75 0 111.06-1.061l1.061 1.06a.75.75 0 010 1.061zM5.404 5.404a.75.75 0 01-1.06 0l-1.061-1.06a.75.75 0 011.06-1.061l1.061 1.06a.75.75 0 010 1.061z" />
                <path fillRule="evenodd" d="M10 15a5 5 0 100-10 5 5 0 000 10zm0-1.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <button onClick={toggleDark} aria-label="Toggle dark mode" className="rounded-[6px] p-1.5" style={{ color: 'var(--color-text-muted)' }}>
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zm8-5a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10z" />
                <path fillRule="evenodd" d="M10 15a5 5 0 100-10 5 5 0 000 10zm0-1.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="rounded-[6px] p-1.5"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zm0 5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="px-5 pb-4 pt-1 sm:hidden" style={{ borderTop: '1px solid var(--color-border)' }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block py-2 text-[14px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              {link.label}
            </Link>
          ))}
          <a
            href={SKOOL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 block w-full rounded-[6px] py-2.5 text-center text-[14px] font-bold"
            style={{ background: 'var(--color-accent)', color: '#1a1a1a' }}
          >
            Join Free Community
          </a>
        </div>
      )}
    </header>
  );
}
