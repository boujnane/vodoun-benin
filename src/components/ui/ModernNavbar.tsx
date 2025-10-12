'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Divinités', href: '/divinites' },
  { label: 'Objets', href: '/objets' },
  // { label: 'Rituels', href: '/rituals' },
  { label: 'Histoire', href: '/history' },
  { label: 'Contact', href: '/contact' },
];

export function ModernNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: scrollY > 50 ? -70 : 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 backdrop-blur-md bg-black/50 font-AfricanFont"
      >
        <div className="text-yellow-300 text-2xl font-extrabold tracking-wider font-AfricanFont">
          Vodun
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-12 text-white uppercase tracking-widest text-sm font-AfricanFont">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="text-white text-3xl md:hidden font-AfricanFont"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </motion.nav>

      {/* Mobile full screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-12 text-white uppercase text-3xl font-AfricanFont"
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
