/**
 * Serverless API Proxy for GNews
 * Keeps API Key hidden on server side and protects client from credentials leaks.
 */
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GNEWS_API_KEY || process.env.VITE_GNEWS_API_KEY;
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return res.status(503).json({ error: 'News API key not configured on server' });
  }

  const { lang = 'ar' } = req.query || {};
  const validLang = lang === 'en' ? 'en' : 'ar';
  const query = validLang === 'en' ? 'economy OR accounting OR finance' : 'اقتصاد OR محاسبة OR مالية';
  const gnewsUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=${validLang}&max=10&apikey=${apiKey}`;

  try {
    const response = await fetch(gnewsUrl);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch from upstream provider' });
    }

    const data = await response.json();

    // Cache header: 10 minutes cache on edge CDN
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: 'Internal server error while fetching news' });
  }
}
