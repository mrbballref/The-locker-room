import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get('videoId');
  const storageProvider = searchParams.get('storageProvider');

  let builder = supabase
    .from('video_assets')
    .select('id,video_id,asset_type,storage_provider,storage_path,mime_type,file_size_bytes,duration_seconds,width,height,frame_rate,checksum,created_at')
    .order('created_at', { ascending: false });

  if (videoId) builder = builder.eq('video_id', videoId);
  if (storageProvider) builder = builder.eq('storage_provider', storageProvider);

  const { data, error } = await builder;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ videoAssets: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    video_id,
    asset_type,
    storage_provider,
    storage_path,
    mime_type,
    file_size_bytes,
    duration_seconds,
    width,
    height,
    frame_rate,
    checksum
  } = body;

  if (!video_id || !asset_type || !storage_provider || !storage_path) {
    return NextResponse.json(
      { error: 'video_id, asset_type, storage_provider and storage_path are required' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('video_assets')
    .insert({
      video_id,
      asset_type,
      storage_provider,
      storage_path,
      mime_type,
      file_size_bytes,
      duration_seconds,
      width,
      height,
      frame_rate,
      checksum
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ videoAsset: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, asset_type, storage_provider, storage_path, mime_type, checksum } = body;

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (asset_type !== undefined) updates.asset_type = asset_type;
  if (storage_provider !== undefined) updates.storage_provider = storage_provider;
  if (storage_path !== undefined) updates.storage_path = storage_path;
  if (mime_type !== undefined) updates.mime_type = mime_type;
  if (checksum !== undefined) updates.checksum = checksum;

  const { data, error } = await supabase
    .from('video_assets')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ videoAsset: data });
}
