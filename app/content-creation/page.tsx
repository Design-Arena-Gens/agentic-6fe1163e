import { ContentCreationClient } from '@/components/ContentCreationClient';
import React from 'react';

export default function ContentCreationPage({ searchParams }: { searchParams: { trend?: string } }) {
  const initialTrend = searchParams?.trend;

  return (
    <ContentCreationClient initialTrend={initialTrend} />
  );
}

