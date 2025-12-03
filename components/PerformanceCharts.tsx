'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type Metric = { label: string; views: number; likes: number; shares: number };

export function PerformanceCharts() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    fetch('/api/analytics').then(r => r.json()).then(d => setMetrics(d.metrics));
  }, []);

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Performance over time</h2>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={metrics}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#3498db" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="likes" stroke="#2ecc71" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="shares" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

