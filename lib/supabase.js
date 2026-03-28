import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://fimdcrhycireslumrlwf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpbWRjcmh5Y2lyZXNsdW1ybHdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MDUxODksImV4cCI6MjA5MDI4MTE4OX0.pHPrKPGXbIDkc1QQSPEU6B8Mi1jaxmz74E7rAA7jJJM'
)