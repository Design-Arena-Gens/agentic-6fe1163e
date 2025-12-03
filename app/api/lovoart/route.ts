import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { script = '' } = body || {};
  // Mock breakdown into scenes
  const lines = script.split('\n').filter(Boolean);
  const scenes = lines.slice(0, 6).map((text: string, i: number) => ({
    id: String(i + 1),
    text,
    visual: i % 2 === 0 ? 'b-roll: dynamic city' : 'talking head: presenter',
    duration: 8
  }));
  return NextResponse.json({ scenes }, { status: 200 });
}

