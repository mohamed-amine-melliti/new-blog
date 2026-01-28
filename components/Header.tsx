import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { SmartSearch } from './SmartSearch';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b-2 border-black">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="bg-black text-white font-black text-3xl tracking-tighter px-3 py-1 group-hover:bg-fas-red transition-colors duration-200">
                  MAM
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="font-bold text-xs tracking-widest uppercase leading-none mb-1">AI & Web</span>
                  <span className="font-bold text-xs tracking-widest uppercase leading-none">Development</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isAnchor = item.href.startsWith('#');
                const isExternal = item.href.startsWith('http');
                let LinkComponent: any = Link;
                let linkProps: any = { to: item.href };

                if (isExternal) {
                    LinkComponent = 'a';
                    linkProps = { 
                        href: item.href,
                        target: "_blank",
                        rel: "noopener noreferrer" 
                    };
                } else if (isAnchor) {
                    // Handle anchor links
                    if (isHome) {
                        LinkComponent = 'a';
                        linkProps = { href: item.href };
                    } else {
                        // If not home, route to home with hash
                        linkProps = { to: '/' + item.href };
                    }
                }

                return (
                  <LinkComponent
                    key={item.label}
                    {...linkProps}
                    className="text-black font-bold text-sm uppercase tracking-widest hover:text-fas-red transition-colors border-b-2 border-transparent hover:border-fas-red py-1 cursor-pointer"
                  >
                    {item.label}
                  </LinkComponent>
                );
              })}
              
              <div className="h-6 w-px bg-gray-300 mx-2"></div>

              <button 
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 text-black font-bold text-sm uppercase tracking-widest hover:text-fas-red transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span className="hidden lg:inline">Search</span>
              </button>
              
              <a
                href="mailto:contact@mam.dev"
                className="bg-fas-red text-white px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-black transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-black p-2 hover:bg-black hover:text-white transition-colors"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t-2 border-black absolute w-full left-0 shadow-xl">
            <div className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                 const isAnchor = item.href.startsWith('#');
                 const isExternal = item.href.startsWith('http');
                 let LinkComponent: any = Link;
                 let linkProps: any = { to: item.href };

                 if (isExternal) {
                     LinkComponent = 'a';
                     linkProps = { 
                         href: item.href,
                         target: "_blank",
                         rel: "noopener noreferrer"
                     };
                 } else if (isAnchor) {
                     // Handle anchor links for mobile
                     if (isHome) {
                         LinkComponent = 'a';
                         linkProps = { href: item.href };
                     } else {
                         linkProps = { to: '/' + item.href };
                     }
                 }

                 return (
                    <LinkComponent
                        key={item.label}
                        {...linkProps}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-6 py-4 text-lg font-bold text-black uppercase tracking-widest border-b border-gray-100 hover:bg-fas-red hover:text-white transition-colors"
                    >
                        {item.label}
                    </LinkComponent>
                 );
              })}
              <button
                 onClick={() => {
                   setIsMenuOpen(false);
                   setIsSearchOpen(true);
                 }}
                 className="w-full text-start px-6 py-4 text-lg font-bold text-black uppercase tracking-widest border-b border-gray-100 hover:bg-fas-red hover:text-white transition-colors flex items-center gap-3"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                   <circle cx="11" cy="11" r="8"></circle>
                   <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                 </svg>
                Ask MAM AI
              </button>
              <a
                href="mailto:contact@mam.dev"
                className="block w-full text-center bg-black text-white px-6 py-6 font-bold uppercase tracking-widest hover:bg-fas-red"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </header>
      
      <SmartSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};