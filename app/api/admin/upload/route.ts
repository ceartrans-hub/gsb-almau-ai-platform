import { NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'data', 'knowledge');

function authorized(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  return password && process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD;
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || !(file instanceof File)) {
    return new Response('No file', { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, file.name), buffer);

  return Response.json({ ok: true });
}
