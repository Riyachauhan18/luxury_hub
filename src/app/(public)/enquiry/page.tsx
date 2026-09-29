import { getSettings } from '@/lib/db';
import EnquiryCartClient from '@/components/EnquiryCartClient';

export const dynamic = 'force-dynamic';

export default async function EnquiryPage() {
  const settings = await getSettings();

  return (
    <EnquiryCartClient settings={settings} />
  );
}
