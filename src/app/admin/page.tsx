import type { Metadata } from 'next';
import { AdminPortal } from '@/components/admin/AdminPortal';

export const metadata: Metadata = {
  title: 'Admin | Bruin Biotech Investing',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="pt-24 pb-16">
      <AdminPortal />
    </main>
  );
}
