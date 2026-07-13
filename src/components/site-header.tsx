'use client';

import { ArrowDownToLine, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { site } from '@/src/content/site';
import { ThemeToggle } from './theme-toggle';
import { TrackedLink } from './tracked-link';

const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/#about' },
];

function ResumeLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={mobile ? 'resume-links resume-links-mobile' : 'resume-links'}>
      {site.resumes.map(resume => (
        <TrackedLink key={resume.href} href={resume.href} event={resume.event} download>
          <span>{resume.label}</span>
          <small>{resume.detail}</small>
        </TrackedLink>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const restore = () => triggerRef.current?.focus();
    dialog.addEventListener('close', restore);
    return () => dialog.removeEventListener('close', restore);
  }, []);

  function closeMenu() {
    dialogRef.current?.close();
  }

  function openMenu() {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand" href="/" aria-label="Qitong Lan, home">
          <span className="brand-mark">QL</span>
          <span className="brand-name">full-stack software engineer</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(item => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <details className="resume-menu">
            <summary>
              <ArrowDownToLine aria-hidden="true" size={17} />
              Résumé
            </summary>
            <ResumeLinks />
          </details>
          <ThemeToggle />
          <button
            ref={triggerRef}
            className="icon-button mobile-trigger"
            type="button"
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={openMenu}
          >
            <Menu aria-hidden="true" size={21} />
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="mobile-dialog"
        aria-label="Navigation menu"
        onClose={() => setMenuOpen(false)}
      >
        <div className="mobile-dialog-head">
          <span className="brand-mark">QL</span>
          <button
            className="icon-button"
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <X aria-hidden="true" size={22} />
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-resumes">
          <p>Choose a résumé</p>
          <ResumeLinks mobile />
        </div>
      </dialog>
    </header>
  );
}
