import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Layanan', href: '#layanan' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Ulasan', href: '#ulasan' },
  { label: 'Lokasi', href: '#lokasi' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[6vw] transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'h-[72px] bg-white/80 backdrop-blur-lg border-b border-sage/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' 
          : 'h-[90px] bg-transparent border-b border-transparent'
      }`}
    >
     
      <a href="#" className="group flex items-center gap-2 font-display text-2xl font-black text-sage-dk tracking-tighter">
        <span className="transition-transform group-hover:scale-110 duration-300">OSHA</span>
        <span className="text-clay">Petcare</span>
      </a>

    
      <ul className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a 
              href={link.href} 
              className="relative text-[13px] uppercase tracking-widest font-bold text-ink/70 hover:text-sage-dk transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-clay after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="tel:082121765420"
            className="flex items-center gap-2 text-sm font-bold bg-sage-dk text-white px-7 py-3 rounded-full hover:bg-clay hover:-translate-y-0.5 shadow-lg shadow-sage-dk/20 transition-all duration-300 active:scale-95"
          >
            <span className="text-xs">📞</span> Hubungi Kami
          </a>
        </li>
      </ul>

      <button
        className="relative z-50 flex md:hidden flex-col justify-center items-center w-10 h-10 bg-sage/10 rounded-xl transition-all active:scale-90"
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Toggle Menu"
      >
        <div className="flex flex-col gap-1.5 w-5">
          <span className={`block h-0.5 bg-sage-dk rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 bg-sage-dk rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-sage-dk rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

   
      <div 
        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible translate-y-[-20px]'
        }`}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className={`text-2xl font-display font-bold text-ink hover:text-sage-dk transition-colors ${menuOpen ? 'animate-fade-up' : ''}`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="tel:082121765420"
          onClick={closeMenu}
          className="mt-4 text-lg font-bold bg-sage-dk text-white px-10 py-4 rounded-full shadow-xl shadow-sage-dk/20 active:scale-95 transition-all"
        >
          📞 Hubungi Kami
        </a>
      </div>
    </nav>
  );
}