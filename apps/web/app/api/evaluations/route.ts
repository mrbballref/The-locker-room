import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const officialId = searchParams.get('officialId');
  const gameId = searchParams.get('gameId');
  const evaluatorId = searchParams.get('evaluatorId');

  let builder = supabase
    .from('evaluations')
    .select('id,official_id,game_id,evaluator_id,score,notes,created_at')
    .order('created_at', { ascending: false });

  if (officialId) builder = builder.eq('official_id', officialId);
  if (gameId) builder = builder.eq('game_id', gameId);
  if (evaluatorId) builder = builder.eq('evaluator_id', evaluatorId);

  const { data, error } = await builder;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ evaluations: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { official_id, game_id, evaluator_id, score, notes } = body;

  if (!official_id || !game_id || !evaluator_id) {
    return NextResponse.json({ error: 'official_id, game_id and evaluator_id are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('evaluations')
    .insert({ official_id, game_id, evaluator_id, score, notes })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ evaluation: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, score, notes } = body;

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (score !== undefined) updates.score = score;
  if (notes !== undefined) updates.notes = notes;

  const { data, error } = await supabase
    .from('evaluations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ evaluation: data });
}
