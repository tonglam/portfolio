import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="state-page shell">
      <p className="eyebrow">404 / route not found</p>
      <h1>This path is outside the system.</h1>
      <p>The page may have moved, or the link may no longer be current.</p>
      <Link className="button button-primary" href="/">
        <ArrowLeft aria-hidden="true" size={17} /> Return home
      </Link>
    </section>
  );
}
