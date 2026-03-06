const PILLARS = [
  { 
    icon: '🌟', 
    title: 'Rating Sempurna 5.0',    
    desc: 'Berdasarkan 92 ulasan bintang lima dari pelanggan nyata di Google.' // Using the 92 number from your original code
  },
  { 
    icon: '❤️', 
    title: 'Penuh Kasih Sayang',  
    desc: 'Kami memperlakukan setiap pasien seperti anggota keluarga sendiri.' 
  },
  { 
    icon: '📍', 
    title: 'Lokasi Strategis',    
    desc: 'Mudah dijangkau dari Bintaro, BSD, dan area Tangsel lainnya.' 
  },
  { 
    icon: '⚕️', 
    title: 'Medis Terlengkap',      
    desc: 'Alat diagnostik modern untuk hasil pemeriksaan yang akurat.' 
  },
];

export default function About() {
  return (
    <section id="tentang" className="relative py-24 px-[6vw] bg-white overflow-hidden">
      
      
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-sage/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">

    
        <div className="relative reveal">
    
          <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] shadow-2xl bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80"
              alt="Kucing sehat dan bahagia"
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
            />
            
           
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-6 shadow-lg border border-sage/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-4xl font-black text-sage-dk">5.0</span>
                <div className="flex text-yellow-400 text-lg">★★★★★</div>
              </div>
              <p className="text-sm font-medium text-muted">
                Rating sempurna dari <span className="text-ink font-bold">92+ pelanggan</span> puas.
              </p>
            </div>
          </div>
        </div>

        
        <div className="reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm border border-sage/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-clay animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-clay">Tentang OSHA Petcare</span>
          </div>

          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-ink leading-[1.15] mb-6">
            Kami Bukan Sekadar Klinik,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-dk to-sage">Kami Adalah Keluarga.</span>
          </h2>

          <p className="text-lg text-muted font-light mb-10 leading-relaxed">
            Berawal dari kecintaan mendalam terhadap hewan, OSHA Petcare hadir untuk memberikan standar perawatan medis yang setara dengan perawatan manusia. 
          </p>

       
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-10">
            {PILLARS.map((p) => (
              <div key={p.title} className="group flex flex-col gap-3">
                <div className="w-12 h-12 bg-sage/5 rounded-xl flex items-center justify-center text-2xl border border-sage/10 group-hover:bg-sage-dk group-hover:text-white group-hover:border-sage-dk transition-all duration-300 shadow-sm">
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink mb-1 group-hover:text-sage-dk transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

         
          <div className="mt-12 flex items-center gap-6 border-t border-sage/10 pt-8">
             <div className="flex flex-col">
                <span className="font-handwriting text-2xl text-sage-dk transform -rotate-2">Tim OSHA Petcare</span>
                <span className="text-xs text-muted uppercase tracking-wider font-bold mt-1">Siap Melayani Sepenuh Hati</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}