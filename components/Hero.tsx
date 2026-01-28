import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="bg-white border-b-2 border-black relative" dir="ltr">
       {/* Background Grid Pattern - subtle texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

      <div className="max-w-screen-2xl mx-auto relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          
          {/* Main Text Area */}
          <div className="lg:col-span-7 xl:col-span-8 p-6 sm:p-12 lg:p-20 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-white/95 backdrop-blur-sm">
             <div className="inline-flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <span className="w-2 h-2 bg-fas-red rounded-full"></span>
               <div className="h-px w-8 bg-gray-400"></div>
               <span className="font-bold uppercase tracking-widest text-xs text-gray-500">Developer • Writer • Est. 2024</span>
             </div>
             
             <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tighter text-black leading-[0.9] mb-10">
               Building the <span className="text-fas-red">Intelligent Web</span>.
             </h1>
             
             <p className="text-lg sm:text-xl text-gray-700 font-medium leading-relaxed max-w-2xl mb-10 border-l-4 border-black pl-6">
               MAM explores the cutting edge of full-stack engineering, generative AI, and the future of software craftsmanship.
             </p>

             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a href="#articles" className="inline-flex items-center justify-center bg-black text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-fas-red transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Read Articles
                </a>
                <a href="#about" className="inline-flex items-center justify-center bg-white text-black border-2 border-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-50 transition-colors">
                  About Me
                </a>
             </div>
          </div>

          {/* Right Sidebar / Featured Image Area */}
          <div className="lg:col-span-5 xl:col-span-4 bg-gray-100 relative flex flex-col border-black">
            
            {/* Image Section */}
            <div className="relative h-[400px] lg:h-2/3 w-full overflow-hidden group border-b-2 border-black">
                <img 
                src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Coding Setup" 
                className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-0 left-0 bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-2">
                    Latest Guide
                </div>
            </div>

            {/* Text Content for Feature */}
            <div className="flex-grow bg-white p-8 flex flex-col justify-center group hover:bg-gray-50 transition-colors">
                <span className="text-fas-red font-bold uppercase tracking-widest text-xs mb-2">
                    System Design
                </span>
                <h2 className="text-2xl font-black leading-tight mb-4 group-hover:text-fas-red transition-colors">
                    Architecting Scalable Event-Driven Systems
                </h2>
                <div className="mt-auto">
                    <a href="#" className="inline-flex items-center text-black font-bold uppercase text-xs tracking-widest hover:underline group-hover:translate-x-1 transition-transform">
                        Read Full Guide →
                    </a>
                </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};