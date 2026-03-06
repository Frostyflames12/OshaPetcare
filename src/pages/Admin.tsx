import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { Service, Testimonial, Lead } from '../types';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) { setError('Isi email dan password.'); return; }
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 relative overflow-hidden">
     
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-sage/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-clay/10 rounded-full blur-[80px]" />

      <div className="w-full max-w-sm bg-white rounded-[32px] p-10 shadow-xl border border-white/50 relative z-10">
        <div className="text-center mb-8">
          <div className="font-display text-2xl font-extrabold text-sage-dk mb-1">
            OSHA <span className="text-clay">Petcare</span>
          </div>
          <p className="text-sm text-muted font-medium uppercase tracking-widest">Admin Portal</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@oshapetcare.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-sage-dk text-white py-4 rounded-xl text-sm font-bold shadow-lg shadow-sage-dk/20 hover:bg-[#3d6642] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Memproses...' : 'Masuk Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
}


function AdminDashboard({ user }: { user: User }) {
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tab, setTab] = useState<'services' | 'testimonials' | 'leads'>('services');
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('services').select('*').order('order').then(({ data }) => data && setServices(data));
    supabase.from('testimonials').select('*').order('created_at', { ascending: false }).then(({ data }) => data && setTestimonials(data));
    supabase.from('leads').select('*').order('created_at', { ascending: false }).then(({ data }) => data && setLeads(data));
  }, []);

  const handleSignOut = () => supabase.auth.signOut();

 
  const updateService = (id: string, field: keyof Service, value: string | number) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const saveService = async (service: Service) => {
    setSaving(service.id);
    await supabase.from('services').update({
      name: service.name,
      description: service.description,
      icon: service.icon,
      order: service.order,
    }).eq('id', service.id);
    
    setTimeout(() => setSaving(null), 500);
  };

 
  const toggleTestimonialVisibility = async (id: string, current: boolean) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, is_visible: !current } : t));
    await supabase.from('testimonials').update({ is_visible: !current }).eq('id', id);
  };

  const TABS = [
    { key: 'services', label: 'Layanan', icon: '🩺' },
    { key: 'testimonials', label: 'Ulasan', icon: '⭐' },
    { key: 'leads', label: 'Leads', icon: '📥' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F5F7F5] flex flex-col md:flex-row">
      
    
      <aside className="bg-white border-r border-sage/10 w-full md:w-64 flex-shrink-0 flex flex-col sticky top-0 h-auto md:h-screen z-20">
        <div className="p-6 border-b border-sage/10 flex items-center justify-between md:block">
          <div className="font-display text-xl font-extrabold text-sage-dk">
            OSHA <span className="text-clay">Admin</span>
          </div>
          
          <button onClick={handleSignOut} className="md:hidden text-2xl" title="Keluar">🚪</button>
        </div>

        <nav className="flex-1 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                tab === t.key
                  ? 'bg-sage-dk text-white shadow-md shadow-sage-dk/20'
                  : 'text-muted hover:bg-sage/5 hover:text-ink'
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
              {t.key === 'leads' && leads.length > 0 && (
                <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full ${tab === t.key ? 'bg-white/20 text-white' : 'bg-clay text-white'}`}>
                  {leads.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sage/10 hidden md:block">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center text-xs font-bold text-sage-dk">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-ink truncate">Admin</p>
              <p className="text-[10px] text-muted truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full border border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            🚪 Keluar
          </button>
        </div>
      </aside>

     
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8">
          <h1 className="font-display text-3xl font-bold text-ink">
            {TABS.find(t => t.key === tab)?.label}
          </h1>
          <p className="text-muted text-sm mt-1">Kelola konten website Anda dari sini.</p>
        </header>

       
        {tab === 'services' && (
          <div className="grid gap-6">
            {services.map(service => (
              <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm border border-sage/10">
                <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_2fr_100px] gap-6 items-start">
                  
                
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-muted tracking-wider">Icon</label>
                    <div className="relative">
                      <input
                        value={service.icon}
                        onChange={e => updateService(service.id, 'icon', e.target.value)}
                        className="w-full text-center text-2xl py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all"
                      />
                    </div>
                  </div>

                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-muted tracking-wider">Nama Layanan</label>
                    <input
                      value={service.name}
                      onChange={e => updateService(service.id, 'name', e.target.value)}
                      className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-ink focus:bg-white focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all"
                    />
                  </div>

                 
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-muted tracking-wider">Deskripsi</label>
                    <textarea
                      value={service.description}
                      onChange={e => updateService(service.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-ink/80 focus:bg-white focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all resize-none"
                    />
                  </div>

                  
                  <div className="flex items-end h-full pb-1">
                    <button
                      onClick={() => saveService(service)}
                      disabled={saving === service.id}
                      className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                        saving === service.id 
                          ? 'bg-sage/20 text-sage-dk cursor-wait' 
                          : 'bg-sage-dk text-white hover:bg-clay shadow-md hover:shadow-lg'
                      }`}
                    >
                      {saving === service.id ? 'Menyimpan...' : 'Simpan'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      
        {tab === 'testimonials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div 
                key={t.id} 
                className={`group relative bg-white rounded-3xl p-6 border-2 transition-all duration-300 ${
                  t.is_visible ? 'border-sage/20 shadow-sm' : 'border-gray-100 opacity-60 grayscale'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage-dk font-bold">
                    {t.author.charAt(0)}
                  </div>
                  <button
                    onClick={() => toggleTestimonialVisibility(t.id, t.is_visible)}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide transition-colors ${
                      t.is_visible 
                        ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600' 
                        : 'bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-700'
                    }`}
                  >
                    {t.is_visible ? 'PUBLISH' : 'HIDDEN'}
                  </button>
                </div>
                
                <p className="text-sm text-ink leading-relaxed mb-4 min-h-[60px]">"{t.text}"</p>
                
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-sage-dk">{t.author}</span>
                  <span className="text-[10px] text-muted">{new Date(t.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

       
        {tab === 'leads' && (
          <div className="bg-white rounded-3xl border border-sage/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider">Nama</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider">Hewan</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-muted">
                        <span className="block text-4xl mb-2">📭</span>
                        Belum ada lead masuk.
                      </td>
                    </tr>
                  )}
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-xs font-medium text-muted whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-ink">
                        {lead.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          lead.pet_type === 'Kucing' ? 'bg-orange-100 text-orange-700' :
                          lead.pet_type === 'Anjing' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {lead.pet_type === 'Kucing' ? '🐱' : lead.pet_type === 'Anjing' ? '🐶' : '🐾'}
                          {lead.pet_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a 
                          href={`https://wa.me/6282121765420?text=Halo ${lead.name}, terima kasih sudah menghubungi OSHA Petcare.`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-sage-dk hover:underline"
                        >
                          Follow Up →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}


export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-sage/20 border-t-sage-dk rounded-full animate-spin"></div>
        <div className="text-sm font-bold text-sage-dk animate-pulse">Memuat Dashboard...</div>
      </div>
    );
  }

  return user ? <AdminDashboard user={user} /> : <LoginForm />;
}