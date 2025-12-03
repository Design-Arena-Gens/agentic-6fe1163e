'use client';
import React, { useEffect, useState } from 'react';

type Scene = { id: string; text: string; visual: string; duration: number };

export function VideoPreview({ script }: { script: string }) {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!script) return;
    setLoading(true);
    fetch('/api/lovoart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ script })
    }).then(r => r.json()).then(d => setScenes(d.scenes)).finally(() => setLoading(false));
  }, [script]);

  return (
    <div className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>Automated video preview</h2>
      {loading && <p>Generating preview?</p>}
      {!loading && scenes.length === 0 && <p>Provide a script to see scene breakdown.</p>}
      {!loading && scenes.length > 0 && (
        <ol style={{ display: 'grid', gap: '.5rem', paddingLeft: '1.25rem' }}>
          {scenes.map(s => (
            <li key={s.id} className="card" aria-label={`Scene ${s.id}`} style={{ padding: '.75rem' }}>
              <strong>Scene {s.id} ? {s.duration}s</strong>
              <div style={{ color: 'var(--muted)', marginTop: 4 }}>{s.visual}</div>
              <div style={{ marginTop: 6 }}>{s.text}</div>
              <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem' }}>
                <button className="btn ghost focus-ring">Change visual</button>
                <button className="btn ghost focus-ring">Adjust duration</button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

