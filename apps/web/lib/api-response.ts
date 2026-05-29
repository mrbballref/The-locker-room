import { NextResponse } from 'next/server';

export function ok<T>(payload: T, status = 200) {
  return NextResponse.json(payload, { status });
}

export function created<T>(payload: T) {
  return ok(payload, 201);
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function unauthorized(message = 'Authentication is required.') {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbidden(message = 'You do not have permission to access this resource.') {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function serverError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unexpected server error';
  return NextResponse.json({ error: message }, { status: 500 });
}

export function supabaseError(error: { message: string } | null) {
  if (!error) return null;
  return NextResponse.json({ error: error.message }, { status: 500 });
}
