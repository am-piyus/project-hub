import type { APIRoute } from 'astro';
import { buildContentIndex } from '../lib/content-index';

// Emits the build-time content index at /content-index.json — project metadata, the URL
// registry, and the tag registry. Available in dev and in the static build, this is the
// structured data the Discovery System (Bucket 0.1.5) and navigation build on.
export const GET: APIRoute = async () => {
  const index = await buildContentIndex();
  return new Response(JSON.stringify(index, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};
