import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  large?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, large }) => {
  const [isHovered, setIsHovered] = useState(false);

  const accentStyle = { color: isHovered ? article.themeColor : undefined };
  const bgStyle = { backgroundColor: article.themeColor };

  return (
    <div 
      className="group flex flex-col h-full bg-white transition-all duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/article/${article.id}`} className={`relative overflow-hidden w-full ${large ? 'aspect-[16/9]' : 'aspect-[4/3]'} border-b-2 border-black block`}>
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div 
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-20"
          style={bgStyle}
        ></div>
        <div 
          className="absolute top-0 right-0 text-white text-xs font-bold uppercase tracking-widest px-4 py-2"
          style={bgStyle}
        >
          {article.category}
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow relative">
        <div 
            className="absolute right-0 top-0 bottom-0 w-1 transition-colors duration-300"
            style={{ backgroundColor: isHovered ? article.themeColor : 'transparent' }}
        ></div>

        <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 transition-colors">
          <time>{article.date}</time>
          <span 
            className="mx-2 text-lg leading-none"
            style={{ color: article.themeColor }}
          >
            •
          </span>
          <span>{article.author}</span>
        </div>
        
        <h3 
          className={`font-black leading-[0.95] tracking-tight mb-4 transition-colors duration-200 ${large ? 'text-3xl md:text-4xl' : 'text-2xl'}`}
          style={accentStyle}
        >
          <Link to={`/article/${article.id}`} className="before:absolute before:inset-0">
            {article.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 leading-relaxed font-medium mb-8 flex-grow line-clamp-3">
          {article.description}
        </p>

        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
          <span 
            className="text-black font-black uppercase text-xs tracking-widest transition-colors"
            style={accentStyle}
          >
            اقرأ التحليل
          </span>
          <div 
            className="bg-black text-white w-8 h-8 flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: isHovered ? article.themeColor : '#111111' }}
          >
             {/* Mirrored arrow for RTL */}
             <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
};