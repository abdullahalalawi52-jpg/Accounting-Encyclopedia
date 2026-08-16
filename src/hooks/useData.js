import { useState, useEffect } from 'react';

// Cache structure: { [url]: { data: any, timestamp: number } }
const dataCache = new Map();
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export function useData(url, options = {}) {
  const { ttl = DEFAULT_TTL, forceRefresh = false } = options;
  const [data, setData] = useState(() => {
    if (!url || forceRefresh) return null;
    const cached = dataCache.get(url);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }
    return null;
  });
  const [loading, setLoading] = useState(() => !data);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    // Check if cache is still valid
    const cached = dataCache.get(url);
    if (!forceRefresh && cached && Date.now() - cached.timestamp < ttl) {
      setData(cached.data);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch data from ${url} (Status: ${res.status})`);
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          dataCache.set(url, { data: json, timestamp: Date.now() });
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url, ttl, forceRefresh]);

  return { data, loading, error };
}

export function invalidateCache(url) {
  if (url) {
    dataCache.delete(url);
  } else {
    dataCache.clear();
  }
}

export default useData;
