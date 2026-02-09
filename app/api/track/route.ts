import { NextRequest } from 'next/server';
import { rateLimit } from '../../../lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!rateLimit(ip, 30, 60_000)) {
    return new Response('Too many requests', { status: 429 });
  }

  const body = await request.json();
  console.log('TRACK_EVENT', {
    ...body,
    ip,
    ts: new Date().toISOString()
  });

  return Response.json({ ok: true });
}
