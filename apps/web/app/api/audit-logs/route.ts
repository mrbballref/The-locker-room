import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const actorId = searchParams.get('actorId');
  const organizationId = searchParams.get('organizationId');
  const action = searchParams.get('action');
  const resourceType = searchParams.get('resourceType');

  let builder = supabase
    .from('audit_logs')
    .select('id,actor_id,organization_id,action,resource_type,resource_id,metadata,ip_address,user_agent,created_at')
    .order('created_at', { ascending: false })
    .limit(100);

  if (actorId) builder = builder.eq('actor_id', actorId);
  if (organizationId) builder = builder.eq('organization_id', organizationId);
  if (action) builder = builder.eq('action', action);
  if (resourceType) builder = builder.eq('resource_type', resourceType);

  const { data, error } = await builder;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ auditLogs: data ?? [] });
}
