import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { site } from '@/src/content/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-name">Qitong Lan</p>
          <p>Software engineer building dependable systems and useful products.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/#work">Work</Link>
          <Link href="/writing">Writing</Link>
          <a href={site.social.linkedin}>
            LinkedIn <ArrowUpRight aria-hidden="true" size={14} />
          </a>
          <a href={site.social.github}>
            GitHub <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </nav>
        <p className="footer-note">
          Perth, WA
          <br />
          Full Australian working rights
        </p>
      </div>
    </footer>
  );
}
