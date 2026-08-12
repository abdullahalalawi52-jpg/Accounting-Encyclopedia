import { useState, useEffect } from 'react';

const cache = {};

export function useData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache[url]) {
      setData(cache[url]);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(json => {
        if (isMounted) {
          cache[url] = json;
          setData(json);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
