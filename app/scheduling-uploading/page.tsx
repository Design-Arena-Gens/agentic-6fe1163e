'use client';
import React from 'react';
import { CalendarScheduler } from '@/components/CalendarScheduler';

export default function SchedulingUploadingPage() {
  return (
    <div className="grid">
      <div className="card">
        <p style={{ marginTop: 0 }}>
          Organize content with a Sheets-like workflow and schedule uploads to TikTok and YouTube Shorts.
        </p>
      </div>
      <CalendarScheduler />
    </div>
  );
}

