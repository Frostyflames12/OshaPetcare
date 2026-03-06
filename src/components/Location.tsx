const INFO_ROWS = [
  {
    id: 'addr',
    icon: '📍',
    label: 'Alamat Klinik',
    
    value: 'Jl. KH. Wahid Hasyim No.94K, Jurang Manggu Tim., Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15155',
    action: 'https://maps.app.goo.gl/xXyYyZz', 
    isLink: true,
  },
  {
    id: 'hours',
    icon: '🕐',
    label: 'Jam Operasional',
    value: 'Senin – Minggu: 09.00 – 21.00 WIB',
    action: null,
    isLink: false,
  },
  {
    id: 'phone',
    icon: '📞',
    label: 'Telepon / WhatsApp',
    value: '+62 821-2176-5420',
    action: 'tel:082121765420',
    isLink: true,
  },
  {
    id: 'ig',
    icon: '📸',
    label: 'Instagram',
    value: '@oshapetcare',
    action: 'https://instagram.com/oshapetcare',
    isLink: true,
  },
];

export default function Location() {
  return (
    <section id="lokasi" className="relative py-24 px-[6vw] bg-[#F5F7F5] overflow-hidden">
      
     
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
       
        <div className="reveal order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/10 border border-sage/20 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sage-dk">Lokasi Kami</span>
          </div>

          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-ink leading-tight mb-6">
            Temukan Kami<br />
            <span className="text-sage-dk">di Tangerang Selatan</span>
          </h2>

          <p className="text-muted text-lg font-light mb-10 max-w-md">
            Kunjungi klinik kami yang nyaman dan ramah. Parkir luas tersedia untuk kenyamanan Anda dan anabul.
          </p>

          <div className="flex flex-col gap-6">
            {INFO_ROWS.map((row) => (
              <div key={row.id} className="group flex gap-5 items-start">
                <div className="w-12 h-12 flex-shrink-0 bg-white border border-sage/15 rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 group-hover:border-sage-dk transition-all duration-300">
                  {row.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-muted uppercase tracking-wider mb-1">
                    {row.label}
                  </div>
                  {row.isLink ? (
                    <a
                      href={row.action || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-ink hover:text-sage-dk hover:underline decoration-sage decoration-2 underline-offset-4 transition-all"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <p className="text-base font-medium text-ink">{row.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

       
          <div className="mt-10">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=OSHA+Petcare+Tangerang+Selatan" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sage-dk text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-sage-dk/20 hover:bg-[#3d6642] hover:-translate-y-1 transition-all"
            >
              🗺️ Petunjuk Arah Google Maps
            </a>
          </div>
        </div>

    
        <div className="reveal order-1 lg:order-2 h-full min-h-[400px]">
          <div className="relative h-full w-full rounded-[32px] overflow-hidden shadow-2xl border-4 border-white transform hover:rotate-1 transition-transform duration-500">
          
            <iframe 
              src="https://maps.google.com/maps?q=OSHA%20Petcare%20Jl.%20KH.%20Wahid%20Hasyim%20No.94K&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '450px', filter: 'grayscale(0.2) contrast(1.1)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi OSHA Petcare"
            ></iframe>

       
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg border border-sage/20 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold text-ink">Buka Sekarang</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}