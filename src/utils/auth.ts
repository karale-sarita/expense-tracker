import supabase from './supabase';

export async function getSupabaseUser() {
    return await supabase.auth.getUser()
}