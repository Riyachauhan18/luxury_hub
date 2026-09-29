import { getSettings } from '@/lib/db';
import ContactPageClient from '@/components/ContactPageClient';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <ContactPageClient settings={settings} />
  );
}
