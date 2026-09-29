import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const rawAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();
const rawServiceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

// Ensure URL starts with http:// or https://
function formatSupabaseUrl(url: string): string {
  if (!url) return '';
  if (url.includes('your-project') || url.includes('placeholder')) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
}

const supabaseUrl = formatSupabaseUrl(rawUrl);
const supabaseAnonKey = rawAnonKey.includes('placeholder') ? '' : rawAnonKey;
const serviceRoleKey = rawServiceKey.includes('placeholder') ? '' : rawServiceKey;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | null = null;
let adminClient: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey);
    adminClient = serviceRoleKey 
      ? createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
      : client;
  } catch (err) {
    console.warn('[Supabase Warning] Invalid configuration in .env.local, falling back to mock database:', err);
    client = null;
    adminClient = null;
  }
}

export const supabase = client;
export const supabaseAdmin = adminClient || client;
