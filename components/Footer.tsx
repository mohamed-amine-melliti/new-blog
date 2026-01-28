import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'Twitter', url: '#', icon: <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/> },
    { name: 'GitHub', url: 'https://github.com/mohamed-amine-melliti', icon: <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/> },
    { name: 'LinkedIn', url: '#', icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/> },
    { name: 'YouTube', url: '#', icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/> }
  ];

  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t-2 border-black">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 border-b border-white/20 pb-20">
          
          <div className="md:col-span-5">
            <div className="mb-8 flex items-center gap-4">
              <div className="bg-white text-black font-black text-4xl tracking-tighter px-4 py-2">MAM</div>
              <span className="font-bold text-sm tracking-widest uppercase leading-tight text-gray-400">
                الذكاء الاصطناعي <br/> وتطوير الويب
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8 text-lg font-light max-w-md">
              حديقة رقمية لاستكشاف حرفية البرمجيات، والذكاء الاصطناعي، ومستقبل الويب.
            </p>
            <div className="flex gap-2">
               {socialLinks.map((link) => (
                 <a 
                    key={link.name} 
                    href={link.url} 
                    target={link.url.startsWith('http') ? "_blank" : undefined}
                    rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="h-12 w-12 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                 >
                   <span className="sr-only">{link.name}</span>
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                     {link.icon}
                   </svg>
                 </a>
               ))}
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">القائمة</h4>
            <ul className="space-y-4 font-bold text-sm uppercase tracking-wider">
              <li><Link to="/about" className="hover:text-fas-red hover:pl-2 transition-all block">من أنا</Link></li>
              <li><a href="/#articles" className="hover:text-fas-red hover:pl-2 transition-all block">المدونة</a></li>
              <li>
                  <a 
                    href="https://github.com/mohamed-amine-melliti" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-fas-red hover:pl-2 transition-all block"
                  >
                    مشاريع
                  </a>
              </li>
              <li><a href="/#speaking" className="hover:text-fas-red hover:pl-2 transition-all block">تحدث</a></li>
              <li><Link to="/resume" className="hover:text-fas-red hover:pl-2 transition-all block text-gray-500">سيرة ذاتية</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
             <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">النشرة البريدية</h4>
             <p className="text-gray-400 text-sm mb-6 leading-relaxed">
               انضم إلى أكثر من 5000 مطور يتلقون نشرتي الأسبوعية.
             </p>
             <form className="flex flex-col gap-4">
               <input 
                 type="email" 
                 placeholder="عنوان البريد الإلكتروني" 
                 className="bg-transparent border-b border-white/30 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-fas-red transition-colors font-bold uppercase tracking-widest text-sm text-right"
               />
               <div className="flex items-center gap-4 mt-2">
                 <input type="checkbox" id="privacy" className="accent-fas-red w-4 h-4 rounded-none bg-black border-white/30" />
                 <label htmlFor="privacy" className="text-xs text-gray-500">أوافق على سياسة الخصوصية</label>
               </div>
               <button className="bg-white text-black px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-fas-red hover:text-white transition-colors mt-2 text-center">
                 اشتراك
               </button>
             </form>
          </div>
        </div>

        <div className="pt-12 flex flex-col md:flex-row justify-between items-end text-[10px] uppercase font-bold tracking-widest text-gray-600">
          <div className="flex flex-col gap-2">
            <p>&copy; {new Date().getFullYear()} MAM. جميع الحقوق محفوظة.</p>
            <p>تم البناء بواسطة React & Tailwind CSS.</p>
          </div>
          <div className="flex gap-8 mt-6 md:mt-0 items-center">
            <Link to="/login" className="hover:text-white transition-colors opacity-50 hover:opacity-100">Admin</Link>
            <a href="#" className="hover:text-white transition-colors">RSS Feed</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a 
                href="https://github.com/mohamed-amine-melliti" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
            >
                GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};