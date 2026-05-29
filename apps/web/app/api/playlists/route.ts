import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get('ownerId');
  const organizationId = searchParams.get('organizationId');
  const visibility = searchParams.get('visibility');

  let builder = supabase
    .from('playlists')
    .select('id,owner_id,organization_id,title,description,visibility,created_at,updated_at')
    .order('updated_at', { ascending: false });

  if (ownerId) builder = builder.eq('owner_id', ownerId);
  if (organizationId) builder = builder.eq('organization_id', organizationId);
  if (visibility) builder = builder.eq('visibility', visibility);

  const { data, error } = await builder;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ playlists: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { owner_id, organization_id, title, description, visibility = 'private' } = body;

  if (!owner_id || !title) {
    return NextResponse.json({ error: 'owner_id and title are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('playlists')
    .insert({ owner_id, organization_id, title, description, visibility })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ playlist: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, title, description, visibility } = body;

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (visibility !== undefined) updates.visibility = visibility;

  const { data, error } = await supabase
    .from('playlists')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ playlist: data });
}
