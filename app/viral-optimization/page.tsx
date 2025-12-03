'use client';
import React, { useEffect, useState } from 'react';
import { PerformanceCharts } from '@/components/PerformanceCharts';
import { ABTesting } from '@/components/ABTesting';

export default function ViralOptimizationPage() {
  const [suggestions, setSuggestions] = useState<{ keywords: string[]; hashtags: string[]; recommendations: string[] }>({ keywords: [], hashtags: [], recommendations: [] });
  useEffect(() => {
    fetch('/api/analytics').then(r => r.json()).then(d => setSuggestions(d.suggestions));
  }, []);

  return (
    <div className="grid">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Recommendations</h2>
        <div className="grid grid-3">
          <div>
            <strong>Keyword suggestions</strong>
            <ul>{suggestions.keywords.map((k, i) => <li key={i}>{k}</li>)}</ul>
          </div>
          <div>
            <strong>Hashtag analysis</strong>
            <ul>{suggestions.hashtags.map((h, i) => <li key={i}>{h}</li>)}</ul>
          </div>
          <div>
            <strong>Best practices</strong>
            <ul>{suggestions.recommendations.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </div>
        </div>
        <div style={{ marginTop: '.5rem' }}>
          <button className="btn focus-ring">Apply optimizations</button>
        </div>
      </div>
      <PerformanceCharts />
      <ABTesting />
    </div>
  );
}

