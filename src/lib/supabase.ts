/**
 * SUG Grappling — Supabase Client
 *
 * Initialized with Expo public env variables. Expo inlines any variable
 * prefixed with EXPO_PUBLIC_* into the JS bundle at build time, so
 * `process.env.EXPO_PUBLIC_*` is read directly here.
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    'Missing EXPO_PUBLIC_SUPABASE_URL. Add it to your .env or .env.local (see .env.example).',
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    'Missing EXPO_PUBLIC_SUPABASE_ANON_KEY. Add it to your .env or .env.local (see .env.example).',
  );
}

console.info('[supabase] url=', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
