'use client';
import React, { useEffect, useMemo, useState } from 'react';

type Trend = {
  id: string;
  title: string;
  volume: number;
  source: 'Google Trends' | 'TikTok' | 'YouTube';
  region: 'US' | 'EU' | 'Global';
};

type SortKey = 'title' | 'volume' | 'source';

export function TrendTable() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [region, setRegion] = useState<'US' | 'EU' | 'Global' | 'All'>('All');
  const [sortKey, setSortKey] = useState<SortKey>('volume');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/trends').then(r => r.json()).then(d => setTrends(d.trends));
  }, []);

  const filtered = useMemo(() => {
    let list = trends;
    if (region !== 'All') list = list.filter(t => t.region === region);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(q));
    }
    list = [...list].sort((a, b) => {
      const vA = a[sortKey];
      const vB = b[sortKey];
      if (vA < vB) return sortDir === 'asc' ? -1 : 1;
      if (vA > vB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [trends, region, sortKey, sortDir, query]);

  function onSort(key: SortKey) {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  return (
    <div className="card" aria-labelledby="trends-title">
      <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', marginBottom: '.75rem', flexWrap: 'wrap' }}>
        <h2 id="trends-title" style={{ marginRight: 'auto' }}>Trending topics</h2>
        <label className="sr-only" htmlFor="region">Region</label>
        <select id="region" className="select focus-ring" value={region} onChange={e => setRegion(e.target.value as any)}>
          <option>All</option>
          <option>US</option>
          <option>EU</option>
          <option>Global</option>
        </select>
        <input
          aria-label="Filter by keyword"
          placeholder="Filter by keyword"
          className="input focus-ring"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: 240 }}
        />
      </div>
      <div role="region" aria-live="polite" aria-label="Trends table">
        <table>
          <thead>
            <tr>
              <th><button className="focus-ring" onClick={() => onSort('title')}>Title</button></th>
              <th><button className="focus-ring" onClick={() => onSort('volume')}>Search volume</button></th>
              <th><button className="focus-ring" onClick={() => onSort('source')}>Source</button></th>
              <th><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>
                  <div aria-label={`Volume ${t.volume}`} className="bar" style={{ width: 200 }}>
                    <span style={{ width: `${t.volume}%` }} />
                  </div>
                </td>
                <td>{t.source}</td>
                <td>
                  <a className="btn focus-ring" href={`/content-creation?trend=${encodeURIComponent(t.title)}`}>Analyze</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

