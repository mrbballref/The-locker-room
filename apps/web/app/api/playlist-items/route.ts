import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get('playlistId');

  if (!playlistId) {
    return NextResponse.json({ error: 'playlistId is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('playlist_items')
    .select('id,playlist_id,video_id,clip_id,bookmark_id,title,note,sort_order,start_time,end_time,created_at')
    .eq('playlist_id', playlistId)
    .order('sort_order', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { playlist_id, video_id, clip_id, bookmark_id, title, note, sort_order = 0, start_time, end_time } = body;

  if (!playlist_id) {
    return NextResponse.json({ error: 'playlist_id is required' }, { status: 400 });
  }

  if (!video_id && !clip_id && !bookmark_id) {
    return NextResponse.json({ error: 'video_id, clip_id or bookmark_id is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('playlist_items')
    .insert({ playlist_id, video_id, clip_id, bookmark_id, title, note, sort_order, start_time, end_time })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, title, note, sort_order, start_time, end_time } = body;

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (title !== undefined) updates.title = title;
  if (note !== undefined) updates.note = note;
  if (sort_order !== undefined) updates.sort_order = sort_order;
  if (start_time !== undefined) updates.start_time = start_time;
  if (end_time !== undefined) updates.end_time = end_time;

  const { data, error } = await supabase
    .from('playlist_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: data });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const { error } = await supabase.from('playlist_items').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ deleted: true });
}
