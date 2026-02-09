import { NextRequest } from 'next/server';
import { rateLimit } from '../../../lib/rate-limit';
import { sendLeadToBitrix } from '../../../lib/lead';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!rateLimit(ip, 6, 60_000)) {
    return new Response('Too many requests', { status: 429 });
  }

  const payload = await request.json();
  if (!payload?.name || (!payload?.phone && !payload?.email)) {
    return new Response('Invalid payload', { status: 400 });
  }

  const result = await sendLeadToBitrix({
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    comment: payload.comment,
    pageUrl: payload.pageUrl,
    utm: payload.utm
  });

  return Response.json(result);
}
