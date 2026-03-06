export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/80 pt-20 pb-10 px-[6vw] border-t border-white/5 font-light">
      
 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
       
        <div className="space-y-6">
          <div className="font-display text-2xl font-extrabold text-white tracking-tight">
            OSHA <span className="text-clay-lt">Petcare</span>
          </div>
          <p className="text-sm leading-relaxed text-white/60 max-w-xs">
            Mitra kesehatan terpercaya untuk anabul kesayangan Anda. Melayani dengan hati, merawat seperti keluarga.
          </p>
          <div className="flex gap-4">
           
            <a 
              href="https://instagram.com/oshapetcare" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sage hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              📸
            </a>
            <a 
              href="https://wa.me/6282121765420" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-300"
              aria-label="WhatsApp"
            >
              💬
            </a>
          </div>
        </div>

     
        <div>
          <h3 className="font-display text-white font-bold text-lg mb-6">Navigasi</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-sage transition-colors">Beranda</a></li>
            <li><a href="#layanan" className="hover:text-sage transition-colors">Layanan Medis</a></li>
            <li><a href="#tentang" className="hover:text-sage transition-colors">Tentang Kami</a></li>
            <li><a href="#ulasan" className="hover:text-sage transition-colors">Ulasan Pelanggan</a></li>
          </ul>
        </div>

       
        <div className="lg:col-span-2">
          <h3 className="font-display text-white font-bold text-lg mb-6">Hubungi Kami</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3 items-start">
              <span className="mt-1">📍</span>
              <span className="text-white/60">
                Jl. KH. Wahid Hasyim No.94K, Jurang Manggu Tim.,<br />
                Kec. Pd. Aren, Kota Tangerang Selatan,<br />
                Banten 15155
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <span>📞</span>
              <a href="tel:082121765420" className="hover:text-sage transition-colors">
                +62 821-2176-5420
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <span>🕐</span>
              <span className="text-white/60">Setiap Hari: 09.00 – 21.00 WIB</span>
            </li>
          </ul>
        </div>
      </div>

    
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <div>
          © {currentYear} OSHA Petcare. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}