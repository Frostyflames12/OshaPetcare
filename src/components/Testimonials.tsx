import { useTestimonials } from '../hooks/useTestimonials';

function TestimonialSkeleton() {
  return (
    <div className="bg-white/5 border border-white/5 rounded-3xl p-8 animate-pulse relative overflow-hidden">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-white/10" />
        <div className="space-y-2">
          <div className="w-24 h-3 bg-white/10 rounded" />
          <div className="w-16 h-2 bg-white/10 rounded" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-2/3" />
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { data: testimonials, isLoading, isError } = useTestimonials();

 
  const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/?q=place_id:ChIJr--DNdXtaS4RDR1vTv0HtPQ";

  return (
    <section id="ulasan" className="relative py-24 px-[6vw] bg-ink overflow-hidden">
     
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sage/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sage-lt">Kata Mereka</span>
          </div>
          
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-white leading-tight mb-4">
            Dipercaya oleh<br />
            <span className="text-sage">Pecinta Hewan</span>
          </h2>
          
          <div className="flex items-center gap-3">
            <div className="flex text-yellow-400 text-lg">★★★★★</div>
            <div className="h-4 w-px bg-white/20" />
            <span className="text-white/80 text-sm font-medium">
              <strong className="text-white">5.0</strong> dari 92 ulasan di Google
            </span>
          </div>
        </div>

        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white text-sm font-bold hover:bg-white hover:text-ink transition-all duration-300"
        >
          <span>Baca Semua Ulasan</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {isLoading && Array.from({ length: 3 }).map((_, i) => <TestimonialSkeleton key={i} />)}

        {isError && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-3xl">
            <p className="text-white/40 text-sm">Gagal memuat ulasan saat ini.</p>
          </div>
        )}

        {!isLoading && !isError && testimonials?.map((t, i) => (
          <article
            key={t.id}
            className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:bg-white/[0.06] hover:-translate-y-1 hover:border-white/10 transition-all duration-300 reveal"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
         
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
             
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-dk to-ink border border-white/10 flex items-center justify-center text-white font-display font-bold text-lg shadow-inner">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold text-sm leading-tight">{t.author}</div>
                  <div className="text-white/40 text-xs">Pelanggan Terverifikasi</div>
                </div>
              </div>
              <div className="text-yellow-400 text-xs tracking-widest">★★★★★</div>
            </div>

        
            <blockquote className="relative">
        
              <span className="absolute -top-2 -left-2 text-4xl text-sage/20 font-serif leading-none select-none">“</span>
              <p className="relative z-10 text-white/80 leading-relaxed font-light text-[15px] pl-4">
                {t.text}
              </p>
            </blockquote>

           
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sage/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          </article>
        ))}
      </div>

    </section>
  );
}