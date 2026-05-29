export function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const webEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
};

export function validatePublicSupabaseEnv() {
  return {
    supabaseUrl: requiredEnv('NEXT_PUBLIC_SUPABASE_URL'),
    supabaseAnonKey: requiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  };
}

export function validateServerSupabaseEnv() {
  return {
    supabaseUrl: requiredEnv('NEXT_PUBLIC_SUPABASE_URL'),
    supabaseServiceRoleKey: requiredEnv('SUPABASE_SERVICE_ROLE_KEY')
  };
}
