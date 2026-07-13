'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="state-page shell">
      <p className="eyebrow">Application error</p>
      <h1>This route did not complete.</h1>
      <p>
        Retry the request. If the problem continues, use the direct contact details in the footer.
      </p>
      <button className="button button-primary" type="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
