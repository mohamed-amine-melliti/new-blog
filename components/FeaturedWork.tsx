import React from 'react';
import { useArticles } from '../contexts/ArticleContext';
import { ArticleCard } from './ArticleCard';

export const FeaturedWork: React.FC = () => {
  const { articles, loading } = useArticles();
  
  // Split articles to feature the first one prominently
  const featuredArticle = articles[0];
  const standardArticles = articles.slice(1);

  if (loading) {
    return (
      <section className="bg-white py-24 border-b-2 border-black">
        <div className="max-w-screen-2xl mx-auto px-4 text-center">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full mb-4"></div>
          <p className="font-bold uppercase tracking-widest text-sm">Loading Articles...</p>
        </div>
      </section>
    );
  }

  if (!featuredArticle) {
    return (
      <section className="bg-white py-24 border-b-2 border-black">
        <div className="max-w-screen-2xl mx-auto px-4 text-center">
           <p className="font-bold uppercase tracking-widest text-sm text-gray-400">No articles found.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="bg-white">
      {/* Header Section */}
      <div className="border-b-2 border-black bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-1 w-8 bg-fas-red"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-black">Insights & Tutorials</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase">
                Latest From <br/> The Blog
              </h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-black font-bold uppercase tracking-widest text-sm hover:text-fas-red transition-colors group">
              View Archive
              <span className="bg-black text-white px-2 py-0.5 text-xs group-hover:bg-fas-red transition-colors">{articles.length}+</span>
            </a>
          </div>
        </div>
      </div>

      {/* Grid Layout using Border Gap Hack */}
      {/* The background is black, and gap is 2px. Items are white. This creates the border lines. */}
      <div className="bg-black gap-0.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b-2 border-black">
        
        {/* Featured Item - Spans 2 cols on Large screens */}
        <div className="lg:col-span-2 bg-white">
          <ArticleCard article={featuredArticle} large={true} />
        </div>

        {/* Side Item 1 */}
        {standardArticles[0] && (
          <div className="bg-white">
            <ArticleCard article={standardArticles[0]} />
          </div>
        )}

        {/* Row 2 */}
        {standardArticles.slice(1).map((article) => (
          <div key={article.id} className="bg-white">
            <ArticleCard article={article} />
          </div>
        ))}

        {/* Filler item to maintain grid or a generic CTA */}
        <div className="bg-black text-white p-12 flex flex-col justify-center items-start">
           <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
             Weekly Newsletter
           </h3>
           <p className="text-gray-400 mb-8 leading-relaxed">
             Get the latest insights on AI engineering and web performance delivered to your inbox.
           </p>
           <div className="w-full">
             <input 
               type="email" 
               placeholder="EMAIL ADDRESS" 
               className="w-full bg-transparent border-b border-gray-600 pb-3 mb-6 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors font-bold uppercase tracking-widest text-sm text-left"
             />
             <button className="w-full bg-white text-black font-black uppercase py-4 tracking-widest hover:bg-fas-red hover:text-white transition-colors">
               Subscribe
             </button>
           </div>
        </div>

      </div>
    </section>
  );
};