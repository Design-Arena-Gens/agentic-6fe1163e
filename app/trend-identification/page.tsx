import { TrendTable } from '@/components/TrendTable';

export default function TrendIdentificationPage() {
  return (
    <div className="grid">
      <div className="card">
        <p style={{ marginTop: 0 }}>
          Discover trending topics across platforms. Filter by region and analyze the most promising ideas.
        </p>
      </div>
      <TrendTable />
    </div>
  );
}

