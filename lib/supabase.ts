import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jzigojijhfehsjuemjmu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6aWdvamlqaGZlaHNqdWVtam11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MzUxNjYsImV4cCI6MjA3MjIxMTE2Nn0.Z_Vwj71qdzjN__zi6DEosPgyjZhUWTTXfCi2rgGdChc'

const supabase = createClient(supabaseUrl, supabaseKey)

// More detailed test connection
const testConnection = async () => {
  try {
    // First test basic connection
    const { data: testData, error: testError } = await supabase
      .from('contacts')
      .select('*')
      .limit(1)
    
    if (testError) {
      console.error('Connection test failed:', testError.message)
      console.error('Error details:', testError)
      return false
    }

    // Test insert capability
    const { error: insertError } = await supabase
      .from('contacts')
      .insert([
        { 
          name: 'test',
          email: 'test@test.com',
          message: 'test message',
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (insertError) {
      console.error('Insert test failed:', insertError.message)
      console.error('Insert error details:', insertError)
      return false
    }

    console.log('✅ Supabase connection and permissions verified')
    return true
  } catch (err) {
    console.error('❌ Critical connection error:', err)
    return false
  }
}

// Run test immediately
testConnection()

export { supabase }
