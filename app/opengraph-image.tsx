import { ImageResponse } from 'next/og';

export const alt = 'Qitong Lan — Software engineer building dependable systems and useful products';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0e151c',
        color: '#edf2f5',
        padding: '68px 76px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 24,
          color: '#9facb7',
        }}
      >
        <span>QL / SYSTEMS &amp; PRODUCTS</span>
        <span>PERTH, WA</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ fontSize: 76, lineHeight: 1.02, maxWidth: 980 }}>
          Dependable backend platforms. Useful web products.
        </div>
        <div style={{ fontSize: 28, color: '#aeb9c2' }}>
          Qitong Lan · Software Engineer · Full Australian working rights
        </div>
      </div>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 22, color: '#9facb7' }}
      >
        <span style={{ width: 14, height: 14, borderRadius: 999, background: '#7ea2ff' }} />{' '}
        qitonglan.com
      </div>
    </div>,
    size
  );
}
