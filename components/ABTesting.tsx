'use client';
import React, { useState } from 'react';

type Variant = { id: 'A' | 'B'; title: string; thumbnail?: string; score: number };

export function ABTesting() {
  const [variants, setVariants] = useState<Variant[]>([
    { id: 'A', title: 'You won?t believe this AI trick', score: 76 },
    { id: 'B', title: '3 AI hacks creators should use today', score: 84 }
  ]);
  const [active, setActive] = useState<'A' | 'B'>('B');

  function updateTitle(id: 'A' | 'B', title: string) {
    setVariants(prev => prev.map(v => v.id === id ? { ...v, title } : v));
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>A/B test titles & thumbnails</h2>
      <div className="grid grid-2">
        {variants.map(v => (
          <div key={v.id} className="card" style={{ borderColor: active === v.id ? 'var(--success)' : undefined }}>
            <strong>Variant {v.id}</strong>
            <input className="input focus-ring" value={v.title} onChange={e => updateTitle(v.id, e.target.value)} />
            <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem' }}>
              <button className="btn ghost focus-ring" onClick={() => setActive(v.id)}>Choose</button>
              <span aria-label="Score" style={{ alignSelf: 'center', color: 'var(--muted)' }}>Score: {v.score}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '.5rem' }}>
        <button className="btn secondary focus-ring">Apply chosen variant</button>
      </div>
    </div>
  );
}

