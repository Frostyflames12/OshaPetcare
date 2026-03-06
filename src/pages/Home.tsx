import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Location from '../components/Location';
import LeadCaptureModal from '../components/LeadCaptureModal';
import Footer from '../components/Footer';

export default function Home() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  useReveal();

  return (
    <>
      <Navbar />

      <main>
        <Hero onOpenLead={() => setLeadModalOpen(true)} />
        <Services />
        <About />
        <Testimonials />
        <Location />

        {/* CTA Banner Section */}
        <section className="px-[6vw] mb-24">
          <div className="relative rounded-[32px] bg-gradient-to-br from-sage-dk to-[#3d6642] px-[8vw] py-20 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden reveal shadow-2xl">
            
            {/* Visual Polish: Background Glows */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 pointer-events-none" />
            
            {/* Decorative Icon */}
            <div 
              aria-hidden="true" 
              className="absolute right-[5%] top-1/2 -translate-y-1/2 -rotate-12 text-[12rem] opacity-[0.05] pointer-events-none select-none transition-transform duration-700 hover:rotate-0"
            >
              🐾
            </div>

            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-white leading-[1.1] mb-4">
                Siap Merawat Si Kecil Berbulu?
              </h2>
              <p className="text-base md:text-lg text-white/80 font-light leading-relaxed">
                Hubungi kami sekarang untuk konsultasi atau buat janji temu.
              </p>
            </div>

            <button
              onClick={() => setLeadModalOpen(true)}
              className="relative z-10 group flex-shrink-0 bg-white text-sage-dk px-10 py-4 rounded-full text-base font-bold shadow-xl transition-all duration-300 hover:bg-cream hover:-translate-y-1 hover:shadow-2xl active:scale-95 flex items-center gap-3"
            >
              <span>📞 Hubungi Sekarang</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </section>
      </main>

      <Footer />

      <LeadCaptureModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
      />
    </>
  );
}