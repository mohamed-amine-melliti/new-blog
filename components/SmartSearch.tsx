import React, { useState, useEffect, useRef } from 'react';
import { queryGemini } from '../services/geminiService';
import { SearchState, SearchResult } from '../types';

interface SmartSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<SearchState>(SearchState.IDLE);
  const [result, setResult] = useState<SearchResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      // Reset state on close
      setQuery('');
      setStatus(SearchState.IDLE);
      setResult(null);
    }
  }, [isOpen]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStatus(SearchState.LOADING);
    try {
      const data = await queryGemini(query);
      setResult(data);
      setStatus(SearchState.SUCCESS);
    } catch (error) {
      setStatus(SearchState.ERROR);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-start justify-center pt-20 px-4">
        <div className="relative bg-white w-full max-w-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
               <span className="text-fas-red">✦</span> اسأل MAM
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-black transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search Input */}
          <div className="p-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="اسأل عن React hooks، أو تحسين LLM، أو تصميم الأنظمة..."
                className="w-full text-2xl font-light text-black placeholder-gray-300 border-b-2 border-black focus:border-fas-red focus:outline-none py-4 bg-transparent transition-colors text-right"
              />
              <button 
                type="submit"
                disabled={status === SearchState.LOADING || !query.trim()}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-black font-bold uppercase hover:text-fas-red disabled:opacity-30 disabled:hover:text-black transition-colors"
              >
                {status === SearchState.LOADING ? 'يفكر...' : 'بحث'}
              </button>
            </form>
          </div>

          {/* Results Area */}
          <div className="px-8 pb-12 min-h-[200px]">
            {status === SearchState.IDLE && (
              <div className="text-gray-400 italic">
                جرب أن تسأل: "ما الفرق بين SSR و CSR؟" أو "اشرح المحولات لطفل عمره 5 سنوات."
              </div>
            )}

            {status === SearchState.LOADING && (
               <div className="flex flex-col items-center justify-center py-12 space-y-4">
                 <div className="w-8 h-8 border-4 border-black border-t-fas-red rounded-full animate-spin"></div>
                 <p className="text-sm font-bold uppercase tracking-widest text-gray-500 animate-pulse">جاري إنشاء الرد</p>
               </div>
            )}

            {status === SearchState.SUCCESS && result && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="prose prose-lg max-w-none text-black">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">الإجابة</h3>
                  <p className="leading-relaxed font-light text-xl">
                    {result.answer}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-gray-100">
                   <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">مواضيع ذات صلة</h3>
                   <div className="flex flex-wrap gap-2">
                     {result.relatedTopics.map((topic, i) => (
                       <span key={i} className="px-3 py-1 bg-gray-100 text-sm font-medium hover:bg-black hover:text-white cursor-pointer transition-colors">
                         {topic}
                       </span>
                     ))}
                   </div>
                </div>
              </div>
            )}

            {status === SearchState.ERROR && (
              <div className="p-4 bg-red-50 text-red-600 border border-red-100">
                حدث خطأ أثناء الاتصال بمحرك الذكاء. يرجى المحاولة مرة أخرى.
              </div>
            )}
          </div>
      

        </div>
      </div>
    </div>
  );
};