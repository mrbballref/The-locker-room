import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get('videoId');

  let builder = supabase
    .from('clips')
    .select('id,video_id,start_time,end_time,title')
    .order('start_time', { ascending: true });

  if (videoId) builder = builder.eq('video_id', videoId);

  const { data, error } = await builder;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ clips: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { video_id, start_time, end_time, title } = body;

  if (!video_id || start_time === undefined || end_time === undefined || !title) {
    return NextResponse.json({ error: 'video_id, start_time, end_time and title are required' }, { status: 400 });
  }

  if (Number(end_time) <= Number(start_time)) {
    return NextResponse.json({ error: 'end_time must be greater than start_time' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('clips')
    .insert({ video_id, start_time, end_time, title })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ clip: data }, { status: 201 });
}
