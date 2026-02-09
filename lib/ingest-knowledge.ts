import fs from 'fs/promises';
import path from 'path';
import pdf from 'pdf-parse';
import { getOpenAIClient } from './openai';
import { getPool } from './db';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'data', 'knowledge');

async function readFileContent(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.pdf') {
    const buffer = await fs.readFile(filePath);
    const parsed = await pdf(buffer);
    return parsed.text;
  }
  return fs.readFile(filePath, 'utf-8');
}

function chunkText(text: string, size = 800, overlap = 120) {
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(text.length, start + size);
    chunks.push(text.slice(start, end));
    start += size - overlap;
  }
  return chunks;
}

async function ensureSchema() {
  const pool = getPool();
  await pool.query('CREATE EXTENSION IF NOT EXISTS vector');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS knowledge_base (
      id SERIAL PRIMARY KEY,
      source TEXT NOT NULL,
      content TEXT NOT NULL,
      embedding vector(1536)
    );
  `);
  await pool.query(
    'CREATE INDEX IF NOT EXISTS knowledge_embedding_idx ON knowledge_base USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100)'
  );
}

export async function ingestKnowledge() {
  const client = getOpenAIClient();
  await ensureSchema();
  const pool = getPool();
  await pool.query('DELETE FROM knowledge_base');

  const files = await fs.readdir(KNOWLEDGE_DIR);
  for (const file of files) {
    const filePath = path.join(KNOWLEDGE_DIR, file);
    const content = await readFileContent(filePath);
    const chunks = chunkText(content);
    for (const chunk of chunks) {
      const response = await client.embeddings.create({
        model: 'text-embedding-3-small',
        input: chunk
      });
      const embedding = response.data[0].embedding;
      await pool.query(
        'INSERT INTO knowledge_base (source, content, embedding) VALUES ($1, $2, $3)',
        [file, chunk, embedding]
      );
    }
  }

  await pool.end();
}
