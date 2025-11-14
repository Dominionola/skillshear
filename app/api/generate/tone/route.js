export async function POST(request) {
  try {
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
