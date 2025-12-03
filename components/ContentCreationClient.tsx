'use client';
import React from 'react';
import { ScriptEditor } from './ScriptEditor';
import { VideoPreview } from './VideoPreview';

export function ContentCreationClient({ initialTrend }: { initialTrend?: string }) {
  const [script, setScript] = React.useState('');
  return (
    <div className="grid">
      <div className="card">
        <p style={{ marginTop: 0 }}>
          Generate scripts for short-form videos using GPT, customize parameters, and preview automated scene plans.
        </p>
      </div>
      <ScriptEditor initialTrend={initialTrend} onScriptChange={setScript} />
      <VideoPreview script={script} />
    </div>
  );
}

