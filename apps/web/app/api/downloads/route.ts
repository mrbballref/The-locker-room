import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const status = searchParams.get('status');

  let builder = supabase
    .from('download_jobs')
    .select('id,user_id,video_asset_id,status,progress,local_file_name,device_id,error_message,requested_at,started_at,completed_at')
    .order('requested_at', { ascending: false });

  if (userId) builder = builder.eq('user_id', userId);
  if (status) builder = builder.eq('status', status);

  const { data, error } = await builder;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ downloads: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { user_id, video_asset_id, device_id, local_file_name } = body;

  if (!user_id || !video_asset_id) {
    return NextResponse.json({ error: 'user_id and video_asset_id are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('download_jobs')
    .insert({ user_id, video_asset_id, device_id, local_file_name, status: 'queued', progress: 0 })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ download: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, status, progress, error_message } = body;

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (status) updates.status = status;
  if (progress !== undefined) updates.progress = progress;
  if (error_message !== undefined) updates.error_message = error_message;
  if (status === 'downloading') updates.started_at = new Date().toISOString();
  if (status === 'completed') updates.completed_at = new Date().toISOString();

  const { data, error } = await supabase
    .from('download_jobs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ download: data });
}
