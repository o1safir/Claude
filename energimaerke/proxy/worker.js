// Cloudflare Worker: videresender GraphQL-kald til Datafordeleren og lægger API-nøglen på.
// Secrets/vars i Cloudflare: DATAFORDELER_API_KEY (secret), ALLOWED_ORIGIN (fx https://safirnielsen-spec.github.io)
export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': origin === env.ALLOWED_ORIGIN ? origin : 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type',
      'Vary': 'Origin',
    };
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST' || origin !== env.ALLOWED_ORIGIN) return new Response('Forbidden', { status: 403, headers: cors });
    const m = new URL(req.url).pathname.match(/^\/(BBR|DAR)\/(v\d+)\/?$/);
    if (!m) return new Response('Not found', { status: 404, headers: cors });
    const up = await fetch(`https://graphql.datafordeler.dk/${m[1]}/${m[2]}?apiKey=${encodeURIComponent(env.DATAFORDELER_API_KEY)}`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: await req.text(),
    });
    return new Response(up.body, { status: up.status, headers: { ...cors, 'content-type': 'application/json' } });
  },
};
