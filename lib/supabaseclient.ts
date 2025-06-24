import {createClient} from '@supabase/supabase-js';

import {
  REACT_APP_SUPABASE_ANON_KEY,
  REACT_APP_SUPABASE_URL,
  SUPABASE_SUMMARY_EMAIL,
  SUPABASE_SUMMARY_PSWD,
} from '@env';
// URLs and keys

// Server-side credentials for internal access (optional usage)
const internalEmail = SUPABASE_SUMMARY_EMAIL!;
const internalPassword = SUPABASE_SUMMARY_PSWD!;

//  Public clientc
export const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_ANON_KEY,
);

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
