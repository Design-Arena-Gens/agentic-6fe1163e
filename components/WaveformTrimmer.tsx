'use client';
import React, { useEffect, useRef, useState } from 'react';
import type WaveSurfer from 'wavesurfer.js';

export function WaveformTrimmer({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wsRef = useRef<WaveSurfer | null>(null);
  const [ready, setReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  useEffect(() => {
    let mounted = true;
    async function init() {
      const WaveSurfer = (await import('wavesurfer.js')).default;
      if (!containerRef.current) return;
      const ws = WaveSurfer.create({
        container: containerRef.current,
        waveColor: '#cfe8fb',
        progressColor: '#3498db',
        url: src,
        height: 80,
        cursorColor: '#1f2937',
        barWidth: 2,
        barGap: 2
      });
      wsRef.current = ws;
      ws.on('ready', () => {
        if (!mounted) return;
        setReady(true);
        setDuration(ws.getDuration());
        setEnd(Math.min(10, ws.getDuration()));
      });
    }
    init();
    return () => {
      mounted = false;
      wsRef.current?.destroy();
      wsRef.current = null;
    };
  }, [src]);

  function playRange() {
    const ws = wsRef.current;
    if (!ws) return;
    ws.setTime(start);
    ws.play();
    const ms = Math.max(0, (end - start) * 1000);
    window.setTimeout(() => ws.pause(), ms);
  }

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Waveform</h3>
      <div ref={containerRef} aria-label="Waveform" />
      <div className="grid grid-3" style={{ marginTop: '.5rem' }}>
        <div>
          <label>Start (s)</label>
          <input
            type="number"
            min={0}
            max={duration}
            step="0.1"
            className="input focus-ring"
            value={start}
            onChange={e => setStart(Math.max(0, Math.min(end, Number(e.target.value))))}
          />
        </div>
        <div>
          <label>End (s)</label>
          <input
            type="number"
            min={0}
            max={duration}
            step="0.1"
            className="input focus-ring"
            value={end}
            onChange={e => setEnd(Math.min(duration, Math.max(start, Number(e.target.value))))}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'end' }}>
          <button disabled={!ready} className="btn focus-ring" onClick={playRange}>Preview Clip</button>
        </div>
      </div>
      <p style={{ color: 'var(--muted)' }} aria-live="polite">
        Duration: {duration.toFixed(1)}s ? Selected: {(end - start).toFixed(1)}s
      </p>
    </div>
  );
}

