import { ingestKnowledge } from '../lib/ingest-knowledge';

ingestKnowledge().catch((error) => {
  console.error(error);
  process.exit(1);
});
