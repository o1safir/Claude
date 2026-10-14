# Proxy til Datafordeleren (kun hvis CORS blokerer)

1. cloudflare.com -> Workers -> Create -> indsæt `worker.js` -> Deploy.
2. Settings -> Variables: `ALLOWED_ORIGIN` = `https://safirnielsen-spec.github.io`
   og secret `DATAFORDELER_API_KEY` = din nøgle.
3. I Feltbogen under Mere: indsæt worker-adressen i "Proxy-adresse" (nøglefeltet kan stå tomt).
