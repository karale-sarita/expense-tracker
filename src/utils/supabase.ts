
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lxjepssbuhsyftrrlqcc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4amVwc3NidWhzeWZ0cnJscWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MjA2NzcsImV4cCI6MjA0NTE5NjY3N30.s0Oqo1dOZQXsQHwSLiMXY2wc-ileMXAQlhiYtFrPZOQ'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;