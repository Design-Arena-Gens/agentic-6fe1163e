import { NextRequest, NextResponse } from 'next/server';

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

const store: Item[] = [];

export async function GET() {
  return NextResponse.json({ items: store }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const item: Item = {
    id: String(Date.now()),
    date: body.date,
    time: body.time,
    platform: body.platform,
    title: body.title,
    description: body.description,
    tags: Array.isArray(body.tags) ? body.tags : [],
    thumbnail: body.thumbnail
  };
  store.push(item);
  return NextResponse.json({ ok: true, item }, { status: 201 });
}

