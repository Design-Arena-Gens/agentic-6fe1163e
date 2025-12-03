import './globals.css';
import type { Metadata } from 'next';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import React from 'react';

export const metadata: Metadata = {
  title: 'Video Automation Dashboard',
  description: 'Trend Identification, Content Creation, Clipping, Scheduling, and Viral Optimization',
  themeColor: '#3498db'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="layout" role="application">
          <aside className="sidebar" aria-label="Primary">
            <Sidebar />
          </aside>
          <main className="main">
            <TopBar />
            <div className="content" role="main">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

