import { useServices } from '../hooks/useServices';

function ServiceSkeleton() {
  return (
    <div className="bg-white/50 rounded-3xl p-8 border border-sage/10 animate-pulse relative overflow-hidden">
      <div className="w-12 h-12 bg-sage/10 rounded-2xl mb-6" />
      <div className="h-5 bg-sage/10 rounded-lg w-2/3 mb-4" />
      <div className="space-y-2">
        <div className="h-3 bg-sage/10 rounded w-full" />
        <div className="h-3 bg-sage/10 rounded w-4/6" />
      </div>
    </div>
  );
}

export default function Services() {
  const { data: services, isLoading, isError } = useServices();

  return (
    <section id="layanan" className="relative py-24 px-[6vw] bg-[#FAF9F6] overflow-hidden">
      
     
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-sage/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 reveal">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/10 border border-sage/20 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sage-dk">Layanan Kami</span>
        </div>
        
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-ink leading-tight mb-5">
          Semua yang Dibutuhkan<br />
          <span className="text-sage-dk">Hewan Peliharaanmu</span>
        </h2>
        
        <p className="text-base text-muted font-light max-w-xl leading-relaxed">
          Kami menyediakan solusi perawatan menyeluruh untuk memastikan anabul Anda mendapatkan kualitas hidup terbaik.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 relative z-10">
        {isLoading && Array.from({ length: 6 }).map((_, i) => <ServiceSkeleton key={i} />)}

        {isError && (
          <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-sage/20">
            <p className="text-muted text-sm">Gagal memuat layanan. Silakan coba lagi nanti.</p>
          </div>
        )}

        {!isLoading && !isError && services?.map((service) => (
          <article
            key={service.id}
            className="group relative bg-white rounded-[24px] p-8 border border-sage/10 transition-colors duration-300 hover:border-sage/30 reveal"
          >
           
            <div className="w-14 h-14 bg-warm rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-sage/10 transition-colors duration-300">
              {service.icon}
            </div>
            
            <h3 className="font-display text-xl font-bold text-ink mb-3">
              {service.name}
            </h3>
            
            <p className="text-sm text-muted leading-relaxed font-light">
              {service.description}
            </p>

           
            <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <span className="text-2xl select-none" aria-hidden="true">🐾</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}