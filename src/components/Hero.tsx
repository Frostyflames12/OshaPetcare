type Props = {
  onOpenLead: () => void;
};

export default function Hero({ onOpenLead }: Props) {
  return (
    /* Removed pt-[80px] to pull the section to the top. Added min-h-screen. */
    <section className="relative grid md:grid-cols-2 min-h-screen overflow-hidden bg-white">
      
      {/* Decorative Background Element (Left) */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-sage/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />

      {/* Left Content Column */}
      {/* Adjusted padding to account for the navbar height (pt-32) */}
      <div className="flex flex-col justify-center px-[6vw] pt-32 pb-20 md:pt-20 md:pb-12 relative z-10">
        
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 bg-warm/50 border border-sage/20 backdrop-blur-sm rounded-full px-4 py-2 text-[11px] uppercase tracking-wider font-bold text-sage-dk w-fit mb-8 animate-fade-up shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sage"></span>
          </span>
          Tangerang Selatan · Banten
        </div>

        {/* Main Heading */}
        <h1 className="font-display text-[clamp(2.8rem,5.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink mb-6 animate-fade-up [animation-delay:150ms]">
          Perawatan <em className="not-italic text-sage-dk relative">
            Terbaik
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-clay/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinecap="round" />
            </svg>
          </em><br />
          untuk <span className="text-clay">Sahabat</span><br />
          Berbulumu
        </h1>

        <p className="text-lg font-light text-muted leading-relaxed max-w-md mb-12 animate-fade-up [animation-delay:300ms]">
          Praktek dokter hewan profesional & petshop lengkap. 
          Melayani dengan hati — <span className="font-medium text-ink">karena hewanmu adalah keluarga.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:450ms]">
          <button
            onClick={onOpenLead}
            className="group bg-sage-dk text-white px-10 py-4 rounded-full text-base font-bold shadow-[0_10px_25px_-5px_rgba(79,122,84,0.4)] hover:bg-[#3d6642] hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(79,122,84,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>📞 Hubungi WhatsApp</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
          
          <a
            href="#layanan"
            className="px-10 py-4 rounded-full border-2 border-sage/20 text-base font-bold text-ink hover:border-sage-dk hover:text-sage-dk hover:bg-sage/5 transition-all duration-300 text-center"
          >
            Lihat Layanan
          </a>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-10 border-t border-sage/10 animate-fade-up [animation-delay:600ms]">
          <div className="flex flex-col">
            <span className="font-display text-3xl font-black text-ink">5.0</span>
            <div className="flex text-clay text-[10px] mb-1">★★★★★</div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-muted/60">Rating Google</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl md:text-3xl font-black text-ink">92+</span>
            <span className="h-[14px] mb-1 italic text-sage text-sm font-medium">Ulasan</span>
            <span className="text-[11px] uppercase tracking-wider font-bold text-muted/60">Pelanggan Puas</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl md:text-3xl font-black text-ink">09.00</span>
            <span className="h-[14px] mb-1 text-sage text-sm font-medium">S/D 21.00</span>
            <span className="text-[11px] uppercase tracking-wider font-bold text-muted/60">Buka Setiap Hari</span>
          </div>
        </div>
      </div>

      
      <div className="relative min-h-[50vh] md:min-h-0 overflow-hidden">
        
        <div className="absolute inset-0 z-10 pointer-events-none md:bg-gradient-to-r md:from-white md:via-transparent md:to-transparent" />
        
        <img
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=90"
          alt="Hewan peliharaan di OSHA Petcare"
          className="absolute inset-0 w-full h-full object-cover saturate-[0.85] contrast-[1.05]"
        />
        
       
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 z-20 bg-white/90 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] flex items-center gap-4 min-w-[280px] animate-slide-right">
          <div className="w-14 h-14 bg-sage-dk rounded-2xl flex items-center justify-center text-2xl shadow-inner shadow-white/20">🩺</div>
          <div>
            <div className="text-sm font-bold text-ink leading-tight">Dokter Hewan Berpengalaman</div>
            <p className="text-xs text-muted mt-1 font-medium">Tim medis profesional siap membantu.</p>
          </div>
        </div>
      </div>

    </section>
  );
}