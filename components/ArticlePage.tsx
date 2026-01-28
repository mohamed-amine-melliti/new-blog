import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticles } from '../contexts/ArticleContext';
import { generateArticleAudio, decodeBase64, decodePCM } from '../services/geminiService';
import { Header } from './Header';
import { Footer } from './Footer';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { articles } = useArticles();
  const article = articles.find(a => a.id === id);

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Cleanup audio on unmount
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [id]);

  const handleListen = async () => {
    if (isPlaying) {
      sourceNodeRef.current?.stop();
      setIsPlaying(false);
      return;
    }

    if (!article) return;

    setIsLoadingAudio(true);
    try {
      // 1. Initialize Audio Context if needed
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;

      // 2. Fetch Audio Data
      const audioData = await generateArticleAudio(article.content);
      
      if (audioData) {
        // 3. Decode PCM
        const bytes = decodeBase64(audioData);
        const buffer = decodePCM(bytes, ctx);

        // 4. Play
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setIsPlaying(false);
        source.start(0);

        sourceNodeRef.current = source;
        setIsPlaying(true);
      } else {
        alert("Could not generate audio for this article. Please try again.");
      }
    } catch (error) {
      console.error("Playback failed:", error);
      alert("Error playing audio.");
    } finally {
      setIsLoadingAudio(false);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-white font-sans text-black flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-black mb-4">404</h1>
            <p className="text-gray-600 mb-8">Article not found.</p>
            <Link to="/" className="bg-black text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-red-600 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
      <Header />
      
      <article>
         {/* Article Header */}
         <div className="max-w-4xl mx-auto px-4 pt-20 pb-12 border-x-0 md:border-x-2 border-transparent md:border-gray-50">
            <div className="flex items-center gap-3 mb-6">
                <span style={{ backgroundColor: article.themeColor }} className="w-3 h-3 block"></span>
                <span style={{ color: article.themeColor }} className="font-bold uppercase tracking-widest text-sm">
                {article.category}
                </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500 border-y-2 border-black py-6">
               <span className="text-black">{article.author}</span>
               <span className="text-gray-300">•</span>
               <time>{article.date}</time>
               <span className="text-gray-300">•</span>
               <span>5 min read</span>
               
               {/* AI Listen Button */}
               <div className="flex-grow md:flex-grow-0 md:ml-auto">
                 <button 
                   onClick={handleListen}
                   disabled={isLoadingAudio}
                   className={`flex items-center gap-2 px-4 py-2 text-white font-bold uppercase tracking-widest text-[10px] transition-colors ${
                     isPlaying 
                       ? 'bg-fas-red hover:bg-red-700' 
                       : 'bg-black hover:bg-gray-800'
                   } disabled:opacity-50 disabled:cursor-wait`}
                 >
                   {isLoadingAudio ? (
                     <>
                        <span className="w-2 h-2 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                        Generating...
                     </>
                   ) : isPlaying ? (
                     <>
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        Stop Listening
                     </>
                   ) : (
                     <>
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        Listen to Article (AI)
                     </>
                   )}
                 </button>
               </div>
            </div>
         </div>

         {/* Hero Image */}
         <div className="w-full border-y-2 border-black mb-16">
            <div className="max-w-7xl mx-auto aspect-[21/9] overflow-hidden">
               <img 
                 src={article.imageUrl} 
                 alt={article.title} 
                 className="w-full h-full object-cover"
               />
            </div>
         </div>

         {/* Content Body */}
         <div className="max-w-3xl mx-auto px-4 pb-24">
             {/* Typography styles provided by Tailwind Typography plugin */}
             <div 
                className="prose prose-lg md:prose-xl prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-p:text-gray-800 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:font-bold prose-blockquote:border-r-4 prose-blockquote:border-black prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-img:border-2 prose-img:border-black max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }} 
             />
             
             {/* Article Footer */}
             <div className="mt-16 pt-8 border-t-2 border-black flex justify-between items-center">
                <div className="font-bold uppercase tracking-widest text-sm text-gray-500">
                    Share
                </div>
                <div className="flex gap-4">
                    <button className="text-black hover:text-blue-600 font-bold uppercase text-xs">Twitter</button>
                    <button className="text-black hover:text-blue-800 font-bold uppercase text-xs">LinkedIn</button>
                </div>
             </div>

             {/* Author Bio Section */}
             <div className="mt-12 p-8 bg-gray-50 border-2 border-black flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full border-2 border-black overflow-hidden bg-white">
                    <img 
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=MAM" 
                      alt="MAM" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="font-black uppercase text-xl mb-2">About the Author</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    MAM is a Full Stack Software Engineer specializing in AI integration and high-performance web applications. Passionate about bridging the gap between complex ML models and intuitive user interfaces.
                  </p>
                  <div className="flex justify-center md:justify-start gap-4">
                    <a href="#" className="text-black font-bold uppercase text-xs tracking-widest hover:text-fas-red transition-colors">Twitter</a>
                    <a href="#" className="text-black font-bold uppercase text-xs tracking-widest hover:text-fas-red transition-colors">GitHub</a>
                    <a href="#" className="text-black font-bold uppercase text-xs tracking-widest hover:text-fas-red transition-colors">LinkedIn</a>
                  </div>
                </div>
             </div>

         </div>
      </article>

      {/* Read Next Section */}
      <div className="bg-gray-50 border-t-2 border-black py-16">
          <div className="max-w-screen-2xl mx-auto px-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Read Next</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {articles.filter(a => a.id !== article.id).slice(0, 3).map(related => (
                      <Link key={related.id} to={`/article/${related.id}`} className="group block">
                          <div className="aspect-video w-full overflow-hidden border-2 border-black mb-4">
                              <img src={related.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                          </div>
                          <h4 className="font-bold text-lg leading-tight group-hover:text-red-600 transition-colors">{related.title}</h4>
                      </Link>
                  ))}
              </div>
          </div>
      </div>

      <Footer />
    </div>
  );
};