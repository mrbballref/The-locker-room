import { supabase } from './supabase';

export interface AuditLogInput {
  actorId?: string;
  organizationId?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export async function writeAuditLog(input: AuditLogInput) {
  const { data, error } = await supabase
    .from('audit_logs')
    .insert({
      actor_id: input.actorId,
      organization_id: input.organizationId,
      action: input.action,
      resource_type: input.resourceType,
      resource_id: input.resourceId,
      metadata: input.metadata ?? {},
      ip_address: input.ipAddress,
      user_agent: input.userAgent
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to write audit log: ${error.message}`);
  }

  return data;
}

export function getRequestAuditMetadata(request: Request) {
  return {
    ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
    userAgent: request.headers.get('user-agent') ?? undefined
  };
}
