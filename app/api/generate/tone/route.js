import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    // Extract the Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Unauthorized', code: 403 }, { status: 403 });
    }

    const token = authHeader.split(' ')[1];

    // Verify the JWT token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return Response.json({ error: 'Permission error', code: 403 }, { status: 403 });
    }

    const body = await request.json();
    const { cmd } = body;

    if (!cmd || typeof cmd.limit !== 'number') {
      return Response.json({ error: 'Invalid cmd or limit parameter' }, { status: 400 });
    }

    const { limit } = cmd;

    // Mock tone generation logic
    const tones = [];
    const toneOptions = ['formal', 'casual', 'professional', 'friendly', 'enthusiastic'];

    for (let i = 0; i < Math.min(limit, 100); i++) {
      tones.push({
        id: i + 1,
        tone: toneOptions[i % toneOptions.length],
        description: `Generated tone ${i + 1}`,
      });
    }

    return Response.json({
      success: true,
      data: tones,
      count: tones.length,
    });
  } catch (error) {
    console.error('Error in /api/generate/tone:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
