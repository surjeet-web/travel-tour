import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to get service role key for admin operations
export const getSupabaseAdmin = () => {
  const serviceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY
  if (!serviceKey) {
    throw new Error('Missing Supabase service key for admin operations')
  }
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export default supabase