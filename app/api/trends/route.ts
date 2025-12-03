import { NextResponse } from 'next/server';

type Trend = {
  id: string;
  title: string;
  volume: number; // 0-100 trend index
  source: 'Google Trends' | 'TikTok' | 'YouTube';
  region: 'US' | 'EU' | 'Global';
};

const sample: Trend[] = [
  { id: '1', title: 'AI video generators', volume: 82, source: 'Google Trends', region: 'Global' },
  { id: '2', title: 'MrBeast philanthropy', volume: 74, source: 'YouTube', region: 'US' },
  { id: '3', title: 'Podcast highlights', volume: 66, source: 'TikTok', region: 'EU' },
  { id: '4', title: 'Black Friday deals', volume: 91, source: 'Google Trends', region: 'US' },
  { id: '5', title: 'Study with me', volume: 58, source: 'YouTube', region: 'EU' },
  { id: '6', title: 'Healthy meal prep', volume: 63, source: 'TikTok', region: 'Global' }
];

export async function GET() {
  // In real app, call Google Trends, TikTok, YouTube APIs
  return NextResponse.json({ trends: sample, ts: Date.now() }, { status: 200 });
}

