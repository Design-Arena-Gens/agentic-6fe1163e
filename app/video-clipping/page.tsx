'use client';
import React, { useState } from 'react';
import { WaveformTrimmer } from '@/components/WaveformTrimmer';

const DEFAULT_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

export default function VideoClippingPage() {
  const [src, setSrc] = useState(DEFAULT_VIDEO);
  const [captions, setCaptions] = useState(true);
  const [effects, setEffects] = useState<'none' | 'zoom' | 'pop'>('none');

  return (
    <div className="grid">
      <div className="card">
        <p style={{ marginTop: 0 }}>
          Search and trim clips from popular videos. Ensure proper attribution and fair use compliance.
        </p>
        <div className="grid grid-3" style={{ alignItems: 'end' }}>
          <div>
            <label>Video URL</label>
            <input className="input focus-ring" value={src} onChange={e => setSrc(e.target.value)} placeholder="Enter video URL" />
          </div>
          <div>
            <label>Effects</label>
            <select className="select focus-ring" value={effects} onChange={e => setEffects(e.target.value as any)}>
              <option value="none">None</option>
              <option value="zoom">Zoom</option>
              <option value="pop">Pop captions</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <label className="focus-ring" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
              <input type="checkbox" checked={captions} onChange={e => setCaptions(e.target.checked)} />
              Add captions
            </label>
          </div>
        </div>
      </div>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Video Player</h2>
        <video
          src={src}
          controls
          style={{
            width: '100%',
            borderRadius: 12,
            border: '1px solid var(--border)',
            filter: effects === 'zoom' ? 'contrast(1.05) saturate(1.1)' : 'none'
          }}
        >
          Your browser does not support the video tag.
        </video>
        {captions && <div style={{ marginTop: 8, color: 'var(--muted)' }}>Captions will be auto-generated at export.</div>}
      </div>
      <WaveformTrimmer src={src} />
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Attribution & Compliance</h3>
        <ul>
          <li>Always credit original creators in descriptions.</li>
          <li>Use short clips and add significant commentary or transformation.</li>
          <li>Respect platform policies and DMCA guidelines.</li>
        </ul>
      </div>
    </div>
  );
}

