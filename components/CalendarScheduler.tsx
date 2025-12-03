'use client';
import React, { useEffect, useMemo, useState } from 'react';

type Item = {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  platform: 'TikTok' | 'YouTube Shorts';
  title: string;
  description: string;
  tags: string[];
  thumbnail?: string;
};

function fmtDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function CalendarScheduler() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [items, setItems] = useState<Item[]>([]);

  const firstOfMonth = useMemo(() => new Date(year, month, 1), [year, month]);
  const startDay = (firstOfMonth.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates = useMemo(() => {
    const start = new Date(year, month, 1 - startDay);
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [year, month, startDay]);

  useEffect(() => {
    fetch('/api/schedule').then(r => r.json()).then(d => setItems(d.items));
  }, []);

  async function addItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      date: String(fd.get('date')),
      time: String(fd.get('time')),
      platform: String(fd.get('platform')) as Item['platform'],
      title: String(fd.get('title')),
      description: String(fd.get('description')),
      tags: String(fd.get('tags') || '').split(',').map(s => s.trim()).filter(Boolean),
      thumbnail: ''
    };
    const res = await fetch('/api/schedule', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    setItems(prev => [...prev, data.item]);
    form.reset();
  }

  const byDate = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const it of items) {
      const arr = map.get(it.date) || [];
      arr.push(it);
      map.set(it.date, arr);
    }
    return map;
  }, [items]);

  return (
    <div className="grid grid-2">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>New scheduled upload</h2>
        <form onSubmit={addItem} className="grid">
          <div className="grid grid-2">
            <div>
              <label>Date</label>
              <input className="input focus-ring" type="date" name="date" defaultValue={fmtDate(today)} required />
            </div>
            <div>
              <label>Time</label>
              <input className="input focus-ring" type="time" name="time" defaultValue="10:00" required />
            </div>
          </div>
          <div className="grid grid-2">
            <div>
              <label>Platform</label>
              <select name="platform" className="select focus-ring">
                <option value="TikTok">TikTok</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
              </select>
            </div>
            <div>
              <label>Frequency</label>
              <select name="frequency" className="select focus-ring" defaultValue="twice-daily" aria-describedby="freq-hint">
                <option value="once">Once</option>
                <option value="twice-daily">Twice daily</option>
                <option value="custom">Custom</option>
              </select>
              <div id="freq-hint" style={{ color: 'var(--muted)' }}>Default: twice daily</div>
            </div>
          </div>
          <div>
            <label>Title</label>
            <input className="input focus-ring" name="title" placeholder="Compelling video title" required />
          </div>
          <div>
            <label>Description</label>
            <textarea className="textarea focus-ring" name="description" placeholder="Short description" rows={4} />
          </div>
          <div>
            <label>Tags (comma separated)</label>
            <input className="input focus-ring" name="tags" placeholder="ai, trends, shorts" />
          </div>
          <div>
            <label>Thumbnail</label>
            <input className="input focus-ring" type="file" accept="image/*" aria-describedby="thumb-hint" />
            <div id="thumb-hint" style={{ color: 'var(--muted)' }}>Upload optional thumbnail (not persisted in demo).</div>
          </div>
          <div>
            <button className="btn secondary focus-ring" type="submit">Add to schedule</button>
          </div>
        </form>
      </div>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Calendar</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
          <button className="btn ghost focus-ring" onClick={() => setMonth(m => (m === 0 ? (setYear(y => y - 1), 11) : m - 1))}>Prev</button>
          <strong>{new Date(year, month).toLocaleString(undefined, { month: 'long', year: 'numeric' })}</strong>
          <button className="btn ghost focus-ring" onClick={() => setMonth(m => (m === 11 ? (setYear(y => y + 1), 0) : m + 1))}>Next</button>
        </div>
        <div className="grid grid-7" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div key={d} style={{ fontWeight: 600, color: 'var(--muted)' }}>{d}</div>
          ))}
          {dates.map((d, i) => {
            const key = fmtDate(d);
            const dayItems = byDate.get(key) || [];
            const isCurrentMonth = d.getMonth() === month;
            return (
              <div key={i} className="card" style={{ opacity: isCurrentMonth ? 1 : 0.5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{d.getDate()}</span>
                </div>
                <div style={{ display: 'grid', gap: 6, marginTop: 6 }}>
                  {dayItems.map(it => (
                    <div key={it.id} style={{ padding: 6, border: '1px solid var(--border)', borderRadius: 8 }}>
                      <div style={{ fontWeight: 600 }}>{it.time} ? {it.platform}</div>
                      <div style={{ color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

