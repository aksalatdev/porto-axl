'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/story', label: 'STORY' },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop - Side Navigation */}
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed left-8 sm:left-12 md:left-16 lg:left-20 top-1/2 -translate-y-1/2 z-40 hidden md:block"
      >
        <ul className="space-y-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-2 font-mono text-[10px] tracking-widest transition-colors ${
                    isActive ? 'text-black' : 'text-gray-300 hover:text-black'
                  }`}
                >
                  <span className={`h-px transition-all ${
                    isActive ? 'bg-black w-6' : 'bg-gray-300 w-4 group-hover:bg-black group-hover:w-6'
                  }`} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.nav>

      {/* Mobile - Bottom Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/80 backdrop-blur-sm border-t border-gray-200"
      >
        <ul className="flex justify-center gap-8 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-mono text-[10px] tracking-widest transition-colors ${
                    isActive ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </>
  );
}
