import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get('teamId');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  let builder = supabase
    .from('games')
    .select('id,home_team,away_team,game_date')
    .order('game_date', { ascending: false });

  if (teamId) {
    builder = builder.or(`home_team.eq.${teamId},away_team.eq.${teamId}`);
  }
  if (from) builder = builder.gte('game_date', from);
  if (to) builder = builder.lte('game_date', to);

  const { data, error } = await builder;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ games: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { home_team, away_team, game_date } = body;

  if (!home_team || !away_team || !game_date) {
    return NextResponse.json({ error: 'home_team, away_team and game_date are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('games')
    .insert({ home_team, away_team, game_date })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ game: data }, { status: 201 });
}
