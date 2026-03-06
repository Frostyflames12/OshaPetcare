import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { PetType } from '../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PET_TYPES: { type: PetType; emoji: string }[] = [
  { type: 'Kucing', emoji: '🐱' },
  { type: 'Anjing', emoji: '🐶' },
  { type: 'Lainnya', emoji: '🐰' },
];

const WHATSAPP_NUMBER = '6282121765420';

function buildWhatsAppUrl(name: string, petType: string): string {
  const message = encodeURIComponent(
    `Halo OSHA Petcare! Nama saya ${name} dan saya ingin bertanya mengenai perawatan untuk ${petType} saya. 🐾`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export default function LeadCaptureModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState('');
  const [petType, setPetType] = useState<PetType>('Kucing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); 

    if (!name.trim()) {
      setError('Mohon masukkan nama Anda.');
      return;
    }

    setLoading(true);
    setError(null);

 
    const { error: dbError } = await supabase
      .from('leads')
      .insert({ name: name.trim(), pet_type: petType });

    if (dbError) {
      console.error('Lead insert failed (continuing to WhatsApp anyway):', dbError);
    }

  
    const url = buildWhatsAppUrl(name.trim(), petType);
    
   
    setTimeout(() => {
      window.open(url, '_blank');
      setLoading(false);
      onClose();
      setName('');
      setPetType('Kucing');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
   
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

     
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl animate-fade-up ring-1 ring-black/5"
      >
      
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-muted/50 hover:bg-gray-100 hover:text-ink transition-colors"
          aria-label="Tutup"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#25D366]/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            💬
          </div>
          <h2 className="font-display text-2xl font-bold text-ink mb-2">
            Konsultasi Gratis
          </h2>
          <p className="text-sm text-muted font-light px-4">
            Isi data singkat di bawah ini, kami akan langsung menghubungkan Anda ke WhatsApp admin.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-6">
            <label htmlFor="lead-name" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
              Nama Anda
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted/50">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <input
                id="lead-name"
                type="text"
                autoFocus
                value={name}
                onChange={e => { setName(e.target.value); setError(null); }}
                placeholder="cth. Budi Santoso"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-ink placeholder:text-muted/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all"
              />
            </div>
          </div>

      
          <div className="mb-8">
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
              Jenis Hewan
            </label>
            <div className="grid grid-cols-3 gap-3">
              {PET_TYPES.map(({ type, emoji }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPetType(type)}
                  className={`relative flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 transition-all duration-200 ${
                    petType === type
                      ? 'bg-sage/5 border-sage-dk text-sage-dk shadow-sm'
                      : 'bg-white border-gray-100 text-muted hover:border-sage/30 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{emoji}</span>
                  <span className="text-[11px] font-bold">{type}</span>
                  
                 
                  {petType === type && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-sage-dk rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 px-4 py-2 rounded-lg mb-6 animate-pulse">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

       
          <button
            type="submit"
            disabled={loading}
            className="w-full group relative flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-xl text-sm font-bold shadow-[0_8px_20px_-5px_rgba(37,211,102,0.4)] hover:bg-[#1ebe5a] hover:shadow-[0_12px_25px_-5px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengalihkan...
              </span>
            ) : (
              <>
                <span>Lanjut ke WhatsApp</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.5 2 2 6.5 2 12.04C2 13.81 2.46 15.5 3.27 17L2 22L7.09 20.73C8.54 21.54 10.23 22 12.04 22C17.58 22 22.08 17.5 22.12 11.96C22.12 6.42 17.58 2 12.04 2ZM17.25 15.36C17.03 16 15.96 16.63 15.46 16.68C14.96 16.73 14.31 16.75 12.16 15.9C9.36 14.79 7.55 12 7.41 11.8C7.27 11.61 6.27 10.28 6.27 8.91C6.27 7.54 6.96 6.87 7.24 6.57C7.47 6.32 7.74 6.26 7.99 6.26C8.24 6.26 8.49 6.27 8.7 6.32C8.92 6.37 9.46 7.69 9.53 7.84C9.6 8 9.66 8.21 9.56 8.4C9.46 8.59 9.38 8.68 9.23 8.86C9.09 9.04 8.93 9.17 9.11 9.48C9.28 9.77 9.89 10.76 10.8 11.57C11.98 12.62 12.94 12.95 13.28 13.1C13.62 13.25 13.82 13.23 14.07 12.95C14.32 12.67 15.18 11.46 15.46 11.07C15.74 10.68 16.03 10.74 16.28 10.83C16.53 10.92 17.89 11.59 18.17 11.73C18.45 11.87 18.64 11.94 18.7 12.05C18.77 12.16 18.77 12.7 17.25 15.36Z" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}