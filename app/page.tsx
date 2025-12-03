import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="grid grid-3">
      <section className="card" aria-labelledby="kpi1">
        <div className="kpi">
          <span id="kpi1" className="value">124</span>
          <span className="label">Trends analyzed</span>
        </div>
        <div className="bar" aria-hidden="true"><span style={{ width: '68%' }} /></div>
      </section>
      <section className="card" aria-labelledby="kpi2">
        <div className="kpi">
          <span id="kpi2" className="value">37</span>
          <span className="label">Scripts generated</span>
        </div>
        <div className="bar" aria-hidden="true"><span style={{ width: '42%', background: 'var(--success)' }} /></div>
      </section>
      <section className="card" aria-labelledby="kpi3">
        <div className="kpi">
          <span id="kpi3" className="value">22</span>
          <span className="label">Scheduled uploads</span>
        </div>
        <div className="bar" aria-hidden="true"><span style={{ width: '30%' }} /></div>
      </section>

      <section className="card">
        <h2>Quick actions</h2>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '.75rem', flexWrap: 'wrap' }}>
          <Link className="btn focus-ring" href="/trend-identification">Find trends</Link>
          <Link className="btn focus-ring" href="/content-creation">Generate script</Link>
          <Link className="btn focus-ring" href="/video-clipping">Clip video</Link>
          <Link className="btn focus-ring" href="/scheduling-uploading">Schedule upload</Link>
          <Link className="btn focus-ring" href="/viral-optimization">Optimize for virality</Link>
        </div>
      </section>
    </div>
  );
}

