'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, FileText, Scissors, CalendarClock, LineChart } from 'lucide-react';

const links = [
  { href: '/', label: 'Dashboard', icon: Sparkles },
  { href: '/trend-identification', label: 'Trend Identification', icon: Sparkles },
  { href: '/content-creation', label: 'Content Creation', icon: FileText },
  { href: '/video-clipping', label: 'Video Clipping', icon: Scissors },
  { href: '/scheduling-uploading', label: 'Scheduling & Uploading', icon: CalendarClock },
  { href: '/viral-optimization', label: 'Viral Optimization', icon: LineChart }
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main Navigation">
      <h1 aria-label="App name">Agentic Video</h1>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {links.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              className="navlink focus-ring"
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

