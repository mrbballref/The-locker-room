import type { UserRole } from './rbac';

export interface LockerRoomSession {
  userId: string;
  email: string;
  role: UserRole;
  organizationIds: string[];
  accessToken?: string;
}

export function getBearerToken(request: Request) {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice('Bearer '.length).trim();
}

export function createSession(input: LockerRoomSession): LockerRoomSession {
  return {
    userId: input.userId,
    email: input.email,
    role: input.role,
    organizationIds: input.organizationIds,
    accessToken: input.accessToken
  };
}

export function requireSession(session: LockerRoomSession | null | undefined) {
  if (!session) {
    const error = new Error('Authentication is required.');
    error.name = 'AuthenticationError';
    throw error;
  }
  return session;
}

export function isOrganizationMember(session: LockerRoomSession, organizationId: string) {
  return session.organizationIds.includes(organizationId);
}
