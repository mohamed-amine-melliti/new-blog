import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 border-b-2 border-black bg-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                    ABOUT <br/> <span className="text-fas-red">THE ENGINEER</span>
                </h1>
                <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-2xl text-gray-600">
                    I'm MAM, a software engineer obsessed with the intersection of <span className="text-black font-bold">Modern Web Frameworks</span> (Laravel, Vue, Angular) and <span className="text-black font-bold">Deep Learning</span>.
                </p>
            </div>
        </section>

        {/* Image & Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black">
            <div className="bg-gray-100 aspect-square md:aspect-auto relative overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-black group">
                 <img 
                    src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1600&auto=format&fit=crop" 
                    alt="MAM Workspace" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                 />
                 <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
                <div className="space-y-12">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Location</h3>
                        <p className="text-2xl font-black uppercase tracking-tight">Cairo, Egypt</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Experience</h3>
                        <p className="text-2xl font-black uppercase tracking-tight">7+ Years Full Stack</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Focus</h3>
                        <p className="text-2xl font-black uppercase tracking-tight">Laravel, Vue, Angular, ML</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Technical Arsenal */}
        <section className="py-24 px-4 border-b-2 border-black bg-fas-black text-white">
            <div className="max-w-screen-2xl mx-auto">
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-16 border-b border-gray-800 pb-8">Technical Arsenal</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Frontend */}
                    <div>
                        <h3 className="text-fas-red font-bold uppercase tracking-widest mb-6">01 // Frontend Architecture</h3>
                        <ul className="space-y-4 font-mono text-sm text-gray-400">
                            <li className="text-white">Vue.js / Nuxt.js</li>
                            <li className="text-white">Angular / RxJS</li>
                            <li>React / Next.js</li>
                            <li>TypeScript / Zod</li>
                            <li>Tailwind CSS / SCSS</li>
                        </ul>
                    </div>
                    
                    {/* Backend */}
                    <div>
                        <h3 className="text-fas-red font-bold uppercase tracking-widest mb-6">02 // Backend & Systems</h3>
                        <ul className="space-y-4 font-mono text-sm text-gray-400">
                            <li className="text-white">Laravel (PHP) / Eloquent</li>
                            <li>Node.js / Bun</li>
                            <li>Python / FastAPI</li>
                            <li>PostgreSQL / MySQL / Redis</li>
                            <li>Docker / Kubernetes</li>
                        </ul>
                    </div>

                    {/* AI */}
                    <div>
                        <h3 className="text-fas-red font-bold uppercase tracking-widest mb-6">03 // AI & ML Engineering</h3>
                        <ul className="space-y-4 font-mono text-sm text-gray-400">
                            <li className="text-white">Deep Learning (PyTorch/TensorFlow)</li>
                            <li>Machine Learning Algorithms</li>
                            <li>Google Gemini API / OpenAI API</li>
                            <li>RAG Pipelines</li>
                            <li>Computer Vision (OpenCV)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* Philosophy */}
        <section className="py-24 px-4 bg-white">
             <div className="max-w-3xl mx-auto text-center">
                 <svg className="w-12 h-12 mx-auto mb-8 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14h-4v-2h4v2zm0-4h-4V7h4v5z"/></svg>
                 <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">Engineering Philosophy</h2>
                 <p className="text-xl text-gray-600 leading-relaxed mb-8">
                    "I believe that the best software is indistinguishable from magic. Whether architecting complex SPAs with Vue & Angular or training Deep Learning models, it requires a deep understanding of the machine, a rigorous attention to detail, and a relentless empathy for the user."
                 </p>
                 <div className="font-handwriting text-4xl text-black opacity-60 font-black rotate-[-5deg]">
                    MAM
                 </div>
             </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};