import { supabase } from './supabase';

export async function signInWithEmail(email:string,password:string){
  return supabase.auth.signInWithPassword({email,password});
}

export async function signOut(){
  return supabase.auth.signOut();
}
