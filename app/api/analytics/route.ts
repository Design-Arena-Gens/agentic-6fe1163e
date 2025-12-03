import { NextResponse } from 'next/server';

export async function GET() {
  const suggestions = {
    keywords: ['ai tools', 'shorts strategy', 'viral content', 'tiktok growth'],
    hashtags: ['#AI', '#Shorts', '#TikTokTips', '#YouTubeShorts', '#ContentCreation'],
    recommendations: [
      'Use a strong hook in the first 2 seconds',
      'Add on-screen captions with high contrast',
      'Test 2 thumbnail variants with bold text'
    ]
  };
  const metrics = Array.from({ length: 12 }, (_, i) => ({
    label: `Day ${i + 1}`,
    views: Math.round(500 + Math.random() * 1500),
    likes: Math.round(80 + Math.random() * 320),
    shares: Math.round(20 + Math.random() * 120)
  }));
  return NextResponse.json({ suggestions, metrics }, { status: 200 });
}

