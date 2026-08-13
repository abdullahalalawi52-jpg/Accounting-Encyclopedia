import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// ضع مفتاح API الخاص بك هنا (مؤقت للاختبار، ويفضل وضعه في ملف .env في بيئة العمل الحقيقية)
const API_KEY = '1f3a616196d4a6ae4e4404b87777eeae'; 

export function useNewsAPI() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fallbackUrl = '/data/articles.json';
    const query = isEn ? 'economy OR accounting OR finance' : 'اقتصاد OR محاسبة OR مالية';
    const langCode = isEn ? 'en' : 'ar';
    const newsApiUrl = `https://gnews.io/api/v4/search?q=${query}&lang=${langCode}&max=10&apikey=${API_KEY}`;

    const fetchFallback = async () => {
      try {
        const res = await fetch(fallbackUrl);
        if (!res.ok) throw new Error('Failed to fetch fallback data');
        const json = await res.json();
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    const fetchNews = async () => {
      if (API_KEY === 'YOUR_API_KEY_HERE' || API_KEY === '1f3a616196d4a6ae4e4404b87777eeae') {
        console.warn('API Key is missing or rate-limited. Using local fallback data.');
        return fetchFallback();
      }

      try {
        const res = await fetch(newsApiUrl);
        if (!res.ok) {
          console.warn('News API limit reached or failed. Falling back to local data.');
          return fetchFallback();
        }
        
        const json = await res.json();
        
        // تحويل تنسيق المقالات القادمة من الـ API لتطابق التنسيق المحلي
        const mappedArticles = json.articles.map((article, index) => {
          // استخراج التاريخ بشكل منسق
          const dateObj = new Date(article.publishedAt);
          const formattedDate = dateObj.toLocaleDateString('ar-EG', { 
            year: 'numeric', month: 'long', day: 'numeric' 
          });

          return {
            id: `news-${index}`,
            title: article.title,
            categoryName: isEn ? 'News & Updates' : 'أخبار وتحديثات',
            categoryId: 'news',
            author: article.source.name || (isEn ? 'News Source' : 'مصدر إخباري'),
            date: formattedDate,
            content: article.content,
            summary: article.description,
            image: article.image,
            time: isEn ? 'Quick Read' : 'قراءة سريعة',
            isFeatured: index < 4,
            url: article.url // لحفظ الرابط الأصلي
          };
        });

        if (isMounted) {
          setData(mappedArticles);
          setLoading(false);
        }
      } catch (err) {
        console.warn('Error fetching from News API. Falling back to local data.', err);
        fetchFallback();
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, [isEn]);

  return { data, loading, error };
}
