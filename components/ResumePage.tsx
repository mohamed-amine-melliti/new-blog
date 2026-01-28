import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const ResumePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white flex flex-col">
      <div className="print:hidden">
         <Header />
      </div>
      
      <main className="flex-grow bg-white py-16 print:py-0">
        <div className="max-w-4xl mx-auto px-6 bg-white print:px-0">
          
          {/* Resume Header */}
          <div className="border-b-4 border-black pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
               <h1 className="text-6xl font-black uppercase tracking-tighter mb-2 leading-none">
                 MAM
               </h1>
               <p className="text-xl font-bold uppercase tracking-widest text-gray-600">
                 Senior Software Engineer & AI Researcher
               </p>
            </div>
            <div className="text-right flex flex-col gap-1 text-sm font-medium">
               <a href="mailto:contact@mam.dev" className="hover:text-fas-red transition-colors">contact@mam.dev</a>
               <a href="https://github.com/mam" className="hover:text-fas-red transition-colors">github.com/mam</a>
               <p>Cairo, Egypt</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Left Column (Main Content) */}
            <div className="md:col-span-8 space-y-12">
              
              {/* Profile */}
              <section>
                <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-4">Professional Profile</h3>
                <p className="text-gray-700 leading-relaxed">
                  Versatile Senior Software Engineer with 7+ years of experience in full-stack development. Specializing in the PHP ecosystem (Laravel) and modern JavaScript frameworks (Vue.js, Angular, React). Deeply passionate about Machine Learning and Deep Learning, applying advanced AI models to solve complex business problems.
                </p>
              </section>

              {/* Experience */}
              <section>
                <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-6">Experience</h3>
                
                <div className="space-y-8">
                   <div className="group">
                      <div className="flex justify-between items-baseline mb-2">
                         <h4 className="font-bold text-lg uppercase group-hover:text-fas-red transition-colors">Lead AI Engineer</h4>
                         <span className="font-mono text-sm text-gray-500">2022 - Present</span>
                      </div>
                      <div className="text-sm font-bold text-gray-500 mb-2">TechCorp Solutions</div>
                      <ul className="list-disc ml-4 space-y-1 text-gray-700 text-sm">
                         <li>Architected a hybrid AI platform using Laravel for orchestration and Python/FastAPI for model inference.</li>
                         <li>Deployed deep learning models for image recognition (CNNs) reducing manual review time by 60%.</li>
                         <li>Led the frontend migration of core products to Vue.js 3 with Composition API.</li>
                      </ul>
                   </div>

                   <div className="group">
                      <div className="flex justify-between items-baseline mb-2">
                         <h4 className="font-bold text-lg uppercase group-hover:text-fas-red transition-colors">Senior Full Stack Developer</h4>
                         <span className="font-mono text-sm text-gray-500">2019 - 2022</span>
                      </div>
                      <div className="text-sm font-bold text-gray-500 mb-2">Creative Digital Agency</div>
                      <ul className="list-disc ml-4 space-y-1 text-gray-700 text-sm">
                         <li>Developed enterprise-grade SPAs using Angular and RxJS for financial sector clients.</li>
                         <li>Built robust APIs using Laravel and integrated complex third-party payment gateways.</li>
                         <li>Mentored junior developers on best practices in PHP and TypeScript.</li>
                      </ul>
                   </div>

                   <div className="group">
                      <div className="flex justify-between items-baseline mb-2">
                         <h4 className="font-bold text-lg uppercase group-hover:text-fas-red transition-colors">Web Developer</h4>
                         <span className="font-mono text-sm text-gray-500">2017 - 2019</span>
                      </div>
                      <div className="text-sm font-bold text-gray-500 mb-2">StartUp Inc</div>
                      <ul className="list-disc ml-4 space-y-1 text-gray-700 text-sm">
                         <li>Maintained legacy PHP applications and progressively migrated modules to Laravel.</li>
                         <li>Implemented real-time dashboards using Vue.js and WebSockets.</li>
                      </ul>
                   </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-6">Education</h3>
                <div>
                   <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-lg">B.Sc. Computer Science</h4>
                      <span className="font-mono text-sm text-gray-500">2013 - 2017</span>
                   </div>
                   <div className="text-sm text-gray-600">Cairo University</div>
                   <p className="text-xs text-gray-500 mt-1">Focus: Artificial Intelligence & Distributed Systems</p>
                </div>
              </section>

            </div>

            {/* Right Column (Sidebar) */}
            <div className="md:col-span-4 space-y-12">
               
               {/* Skills */}
               <section>
                  <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-4">Technical Skills</h3>
                  
                  <div className="space-y-4">
                     <div>
                        <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Languages</h4>
                        <p className="text-sm font-medium">PHP, Python, TypeScript, JavaScript, SQL</p>
                     </div>
                     <div>
                        <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Frontend</h4>
                        <p className="text-sm font-medium">Vue.js, Angular, React, Tailwind CSS</p>
                     </div>
                     <div>
                        <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Backend & Cloud</h4>
                        <p className="text-sm font-medium">Laravel, Node.js, FastAPI, PostgreSQL, Docker, AWS</p>
                     </div>
                     <div>
                        <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">AI / ML</h4>
                        <p className="text-sm font-medium">Deep Learning, Machine Learning, PyTorch, TensorFlow, OpenCV</p>
                     </div>
                  </div>
               </section>

               {/* Projects Highlight */}
               <section>
                  <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-4">Key Projects</h3>
                  <div className="space-y-4">
                     <div>
                        <h4 className="font-bold text-sm">Laravel-based AI Orchestrator</h4>
                        <p className="text-xs text-gray-600 mt-1">A robust backend system managing distributed AI inference jobs using Laravel Queues.</p>
                     </div>
                     <div>
                        <h4 className="font-bold text-sm">Computer Vision Quality Control</h4>
                        <p className="text-xs text-gray-600 mt-1">Deployed custom CNN models for defect detection in manufacturing lines.</p>
                     </div>
                     <div>
                        <h4 className="font-bold text-sm">Enterprise Angular Dashboard</h4>
                        <p className="text-xs text-gray-600 mt-1">High-performance analytics dashboard handling millions of data points with RxJS.</p>
                     </div>
                  </div>
               </section>
               
               {/* Print Button (Hidden when printing) */}
               <div className="print:hidden pt-8">
                 <button 
                   onClick={handlePrint}
                   className="w-full bg-black text-white py-4 font-black uppercase tracking-widest text-sm hover:bg-fas-red transition-colors flex items-center justify-center gap-2"
                 >
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                   </svg>
                   Download PDF
                 </button>
               </div>

            </div>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};