import { Book, Calculator, TrendingUp, FileText, ArrowLeft, ArrowRight, Star, FileDown, ExternalLink, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData.js';
import { useNewsAPI } from '../hooks/useNewsAPI.js';
import { latestTemplates } from '../data/templates.js';
import { useTranslation } from 'react-i18next';

import ArticleCard from '../components/cards/ArticleCard.jsx';
import CategoryCard from '../components/cards/CategoryCard.jsx';
import PageHero from '../components/ui/PageHero.jsx';

const ICONS = {
  'financial': Book,
  'cost': TrendingUp,
  'audit': FileText,
  'tax': Calculator
};

function Home() {
  const { t, i18n } = useTranslation();
  const { data: categoriesData } = useData('/data/categories.json');
  const { data: articlesData } = useNewsAPI();
  
  const categoriesList = categoriesData?.list || [];
  const featuredArticles = articlesData ? articlesData.filter(a => a.isFeatured) : [];
  
  const displayCategories = categoriesList.filter(c => ICONS[c.id]).slice(0, 4);

  return (
    <div className="home-page animate-fade-in pb-20">
      <PageHero 
        title={t('home.hero_title')}
        description={t('home.hero_desc')}
        padding="py-24"
      />

      {/* Main Content Area */}
      <div className="container mt-12 flex flex-col lg:flex-row gap-8">
        
        {/* Main Feed (Right Side in RTL) */}
        <div className="w-full lg:w-2/3">
          {/* Categories */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-2 border-b border-[var(--border-color)]">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t('home.browse_categories')}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {displayCategories.map((cat, index) => {
                const IconComponent = ICONS[cat.id] || BookOpen;
                return (
                  <CategoryCard key={index} category={{...cat, desc: categoriesData?.info?.[cat.id]?.desc, desc_en: categoriesData?.info?.[cat.id]?.desc_en}} IconComponent={IconComponent} />
                );
              })}
            </div>
          </div>

          {/* Featured Articles */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Star className="text-[var(--primary-accent)]" size={20} /> {t('home.featured_articles')}
              </h2>
              <Link to="/articles" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] flex items-center gap-1 text-sm transition-colors">
                {t('home.view_all')} {i18n.language.startsWith('ar') ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </Link>
            </div>
            
            {articlesData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article, index) => (
                  <ArticleCard key={index} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <span className="text-[var(--text-secondary)]"></span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar (Left Side in RTL) */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-8">
          {/* Latest Templates */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-sm relative overflow-hidden" style={{ padding: '25px' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -z-10"></div>
            
            <div className="flex items-center gap-3 mb-[34px] pb-4 border-b border-[var(--border-color)]">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <FileDown size={20} />
              </div>
              <h3 className="font-bold text-[var(--text-primary)] text-lg">{t('home.latest_templates')}</h3>
            </div>
            
            <div className="space-y-[14px]">
              {latestTemplates.map(template => (
                <Link key={template.id} to={`/templates/${template.id}`} className="group flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-main)] transition-colors gap-3">
                  <span className="text-[var(--text-secondary)] text-sm font-medium group-hover:text-[var(--text-primary)] transition-colors flex-1 truncate">
                    {i18n.language.startsWith('en') && template.title_en ? template.title_en : template.title}
                  </span>
                  <span className={`text-xs px-3 py-1.5 rounded-md font-bold shrink-0 ${
                    template.type === 'Excel' ? 'bg-emerald-500/10 text-emerald-600' :
                    template.type === 'Word' ? 'bg-blue-500/10 text-blue-600' :
                    'bg-red-500/10 text-red-600'
                  }`}>
                    {template.type}
                  </span>
                </Link>
              ))}
            </div>
            
            <div className="mt-[26px] pt-4 border-t border-[var(--border-color)]">
              <Link to="/templates" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] flex items-center gap-1.5 text-sm justify-center font-bold transition-colors group">
                {t('home.browse_full_library')} {i18n.language.startsWith('ar') ? <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> : <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
              </Link>
            </div>
          </div>

          {/* Promo Box */}
          <div className="bg-gradient-to-br from-[var(--primary-accent)] to-[var(--primary-hover)] rounded-2xl p-8 text-center relative overflow-hidden shadow-lg shadow-[var(--primary-accent)]/20 text-white">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>
            
            <h3 className="font-bold text-2xl mb-3 relative z-10 text-white" style={{ color: 'white' }}>{t('home.ifrs_standards')}</h3>
            <p className="text-sm mb-6 leading-relaxed relative z-10" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              {t('home.ifrs_desc')}
            </p>
            <Link to="/standards" className="bg-white text-[var(--primary-accent)] hover:bg-slate-50 px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105 active:scale-95 w-full flex items-center justify-center gap-2 relative z-10 shadow-md">
              {t('home.discover_standards')} <ExternalLink size={18} />
            </Link>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default Home;
