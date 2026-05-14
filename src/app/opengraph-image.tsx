import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Karan Aggarwal - Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #030712 0%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: 72, fontWeight: 'bold', margin: '0 0 20px 0', color: '#06b6d4' }}>
          $ npm install karan-aggarwal
        </h1>
        <p style={{ fontSize: 32, opacity: 0.8, color: '#7c3aed' }}>
          Software Engineer | Full Stack | Open Source
        </p>
      </div>
    ),
    { ...size }
  );
}
