import { NextRequest } from 'next/server';
import { ingestKnowledge } from '../../../../lib/ingest-knowledge';

function authorized(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  return password && process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD;
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  await ingestKnowledge();
  return Response.json({ ok: true, message: 'Индекс пересобран.' });
}
