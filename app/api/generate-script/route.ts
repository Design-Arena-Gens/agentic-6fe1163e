import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { trend = 'Trending Topic', tone = 'informative', length = '60s', audience = 'general' } = body || {};
  const script = `# ${trend}\n\nIntro: Hook the viewer with a compelling fact.\n\nMain Points:\n- Explain why "${trend}" matters to the ${audience} audience\n- Provide 2-3 key takeaways in a ${tone} tone\n- Keep pacing tight to fit ~${length}\n\nCall to Action: Ask viewers to comment with their thoughts.\n\nOutro: Quick recap and teaser for next clip.`;
  return NextResponse.json({ script }, { status: 200 });
}

