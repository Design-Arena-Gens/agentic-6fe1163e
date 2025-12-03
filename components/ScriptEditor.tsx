'use client';
import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';

type Props = {
  initialTrend?: string;
  onScriptChange?: (v: string) => void;
};

export function ScriptEditor({ initialTrend, onScriptChange }: Props) {
  const [trend, setTrend] = useState(initialTrend || '');
  const [tone, setTone] = useState('informative');
  const [length, setLength] = useState('60s');
  const [audience, setAudience] = useState('general');
  const [script, setScript] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (onScriptChange) onScriptChange(script);
  }, [script, onScriptChange]);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trend, tone, length, audience })
      });
      const data = await res.json();
      setScript(data.script);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-2">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Parameters</h2>
        <div className="grid grid-2">
          <div>
            <label>Trend</label>
            <input className="input focus-ring" value={trend} onChange={(e) => setTrend(e.target.value)} placeholder="Enter trend topic" />
          </div>
          <div>
            <label>Tone</label>
            <select className="select focus-ring" value={tone} onChange={e => setTone(e.target.value)}>
              <option value="informative">Informative</option>
              <option value="entertaining">Entertaining</option>
              <option value="persuasive">Persuasive</option>
            </select>
          </div>
          <div>
            <label>Length</label>
            <select className="select focus-ring" value={length} onChange={e => setLength(e.target.value)}>
              <option value="30s">30 sec</option>
              <option value="60s">60 sec</option>
              <option value="90s">90 sec</option>
            </select>
          </div>
          <div>
            <label>Target audience</label>
            <select className="select focus-ring" value={audience} onChange={e => setAudience(e.target.value)}>
              <option value="general">General</option>
              <option value="creators">Creators</option>
              <option value="students">Students</option>
              <option value="professionals">Professionals</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: '.75rem', display: 'flex', gap: '.5rem' }}>
          <button className="btn focus-ring" onClick={generate} aria-busy={loading} disabled={loading}>
            {loading ? 'Generating?' : 'Generate Script'}
          </button>
        </div>
      </div>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Script</h2>
        <CodeMirror
          value={script}
          height="400px"
          extensions={[markdown()]}
          onChange={(v) => setScript(v)}
          aria-label="Generated script editor"
        />
      </div>
    </div>
  );
}

