import { createClient } from '@supabase/supabase-js';
import { validatePublicSupabaseEnv } from './env';

const { supabaseUrl, supabaseAnonKey } = validatePublicSupabaseEnv();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
