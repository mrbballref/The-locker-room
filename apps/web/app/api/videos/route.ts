import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('gameId');
  const query = searchParams.get('q');

  let builder = supabase
    .from('videos')
    .select('id,title,storage_path,created_at')
    .order('created_at', { ascending: false });

  if (gameId) builder = builder.eq('game_id', gameId);
  if (query) builder = builder.ilike('title', `%${query}%`);

  const { data, error } = await builder;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ videos: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, game_id, storage_path } = body;

  if (!title || !storage_path) {
    return NextResponse.json({ error: 'title and storage_path are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('videos')
    .insert({ title, game_id, storage_path })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ video: data }, { status: 201 });
}
