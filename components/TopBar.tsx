import React from 'react';

export function TopBar() {
  return (
    <div className="topbar" role="banner">
      <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
        <span aria-hidden="true" style={{ width: 10, height: 10, background: 'var(--success)', borderRadius: '50%' }} />
        <strong>Automation Ready</strong>
      </div>
      <div style={{ display: 'flex', gap: '.5rem' }}>
        <input
          aria-label="Search"
          placeholder="Search"
          className="input focus-ring"
          style={{ width: 260 }}
        />
        <button className="btn ghost focus-ring" aria-label="Help">Help</button>
      </div>
    </div>
  );
}

