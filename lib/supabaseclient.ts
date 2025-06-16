import {createClient} from '@supabase/supabase-js';

import {SUPABASE_URL, SUPABASE_KEY, SUPABASE_SERVICE_ROLE_KEY} from '@env';
// URLs and keys
const supabaseUrl = SUPABASE_URL!;
const supabaseAnonKey = SUPABASE_KEY!; // anon/public key
const supabaseServiceRoleKey = SUPABASE_SERVICE_ROLE_KEY!; // admin key

// Server-side credentials for internal access (optional usage)
const internalEmail = process.env.SUPABASE_EMAIL!;
const internalPassword = process.env.SUPABASE_PASSWORD!;

//  Public clientc
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
//  Admin client (used for secure admin tasks like creating users)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

//  Optional internal sign-in (use this only if you want to query as a logged-in user)
export async function SignIn() {
  const {error} = await supabase.auth.signInWithPassword({
    email: internalEmail,
    password: internalPassword,
  });

  if (error) {
    console.error('❌ SignIn error:', error.message);
    return;
  }

  console.log('✅ AUTH SUCCESS with internal credentials');
}
