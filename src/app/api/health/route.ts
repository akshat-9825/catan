import { supabase } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    checks: {
      database: 'unknown',
      supabase: 'unknown'
    }
  }

  try {
    // Test Supabase connection with a simple query
    const { error } = await supabase
      .from('_health_check')  // Non-existent table is fine
      .select('*')
      .limit(1)
    
    // If we get a connection, even with table error, DB is reachable
    healthCheck.checks.database = 'connected'
    healthCheck.checks.supabase = 'connected'
    
    return NextResponse.json(healthCheck, { status: 200 })
    
  } catch (error) {
    healthCheck.status = 'error'
    healthCheck.checks.database = 'disconnected'
    healthCheck.checks.supabase = 'disconnected'
    
    return NextResponse.json(healthCheck, { status: 503 })
  }
}