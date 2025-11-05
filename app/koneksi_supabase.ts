import { createClient } from '@supabase/supabase-js'

// project url
const supabaseUrl = 'https://mkwhevwrcubxhkbrxikf.supabase.co'
// anon key
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hldndyY3VieGhrYnJ4aWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3OTY5NTEsImV4cCI6MjA3NzM3Mjk1MX0.KVmQo1JMS4oTdJxjE33xTwTmXQNWb_O060xBgLMDdNg'

export const supabase = createClient(supabaseUrl, supabaseKey)