import { getAllTeamMembersAdmin } from '@/lib/db';
import AdminTeamClient from '@/components/AdminTeamClient';

export const dynamic = 'force-dynamic';

export default async function AdminTeamPage() {
  const teamMembers = await getAllTeamMembersAdmin();

  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-white/5 pb-6">
        <h1 className="font-serif text-3xl font-light tracking-wide text-white">
          Team Members & Owner Profile
        </h1>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Manage owner/founder profiles, showroom consultants, and team biographies displayed on the About page.
        </p>
      </div>

      <AdminTeamClient initialTeam={teamMembers} />
    </div>
  );
}
