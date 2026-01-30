import React from 'react';

export const SpeakingSection: React.FC = () => {
  const talks = [
    {
      year: '2024',
      event: 'Laracon EU',
      location: 'Amsterdam, NL',
      title: 'Integrating LLMs into Monolithic Laravel Architectures',
      type: 'Keynote'
    },
    {
      year: '2023',
      event: 'Vue.js Live',
      location: 'Tunis , Tunisia',
      title: 'Reactive Intelligence: Building AI Agents with Vue 3',
      type: 'Workshop'
    },
    {
      year: '2023',
      event: 'PyCon MEA',
      location: 'Tunis , Tunisia',
      title: 'From Script to Production: Scalable Deep Learning Inference',
      type: 'Talk'
    },
    {
      year: '2022',
      event: 'NG-CONF',
      location: 'Salt Lake City, US',
      title: 'Managing Complex State in Enterprise Angular Apps',
      type: 'Case Study'
    }
  ];

  return (
    <section id="speaking" className="bg-fas-black text-white py-24 border-b-2 border-black">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Header */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-1 w-8 bg-fas-red"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Public Discourse</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                Speaking & <br/> <span className="text-gray-500">Workshops</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                I share insights on bridging the gap between traditional web engineering and the new frontier of Artificial Intelligence.
              </p>
              <a href="mailto:contact@mam.dev?subject=Speaker Request" className="inline-block bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-fas-red hover:text-white transition-colors">
                Request to Speak
              </a>
            </div>
          </div>

          {/* Talks List */}
          <div className="lg:col-span-8">
             <div className="space-y-0">
               {talks.map((talk, index) => (
                 <div key={index} className="group border-t border-gray-800 py-12 flex flex-col md:flex-row md:items-baseline gap-6 hover:bg-white/5 transition-colors px-4 -mx-4">
                    <div className="w-24 text-fas-red font-mono font-bold text-xl">{talk.year}</div>
                    <div className="flex-grow">
                       <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-fas-red transition-colors">{talk.title}</h3>
                       <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                          <span>{talk.event}</span>
                          <span>•</span>
                          <span>{talk.location}</span>
                       </div>
                    </div>
                    <div className="w-32 md:text-right mt-4 md:mt-0">
                       <span className="inline-block border border-gray-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                         {talk.type}
                       </span>
                    </div>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};