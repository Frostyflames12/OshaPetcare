-- ============================================================
-- OSHA PETCARE — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================


-- ─── Tables ───────────────────────────────────────────────────

create table services (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  description text not null,
  icon       text not null,
  "order"    int  not null default 0,
  created_at timestamptz default now()
);

create table testimonials (
  id         uuid primary key default gen_random_uuid(),
  author     text not null,
  text       text not null,
  is_visible boolean default true,
  created_at timestamptz default now()
);

create table leads (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  pet_type   text not null,
  created_at timestamptz default now()
);


-- ─── Row Level Security ───────────────────────────────────────

alter table services     enable row level security;
alter table testimonials enable row level security;
alter table leads        enable row level security;

-- Services: anyone can read, only authenticated owner can update
create policy "Public can read services"
  on services for select using (true);

create policy "Authenticated can update services"
  on services for update using (auth.role() = 'authenticated');

-- Testimonials: anyone can read visible ones, authenticated can do all
create policy "Public can read visible testimonials"
  on testimonials for select using (is_visible = true);

create policy "Authenticated can manage testimonials"
  on testimonials for all using (auth.role() = 'authenticated');

-- Leads: anyone can insert, only authenticated can read
create policy "Public can insert leads"
  on leads for insert with check (true);

create policy "Authenticated can read leads"
  on leads for select using (auth.role() = 'authenticated');


-- ─── Seed Data ────────────────────────────────────────────────

insert into services (name, description, icon, "order") values
  ('Konsultasi & Pemeriksaan', 'Pemeriksaan menyeluruh oleh dokter hewan berpengalaman. Diagnosis tepat, penanganan cepat, dengan penuh kasih sayang.', '🩺', 1),
  ('Vaksinasi',                'Jadwal vaksinasi lengkap untuk anjing dan kucing. Perlindungan optimal dari berbagai penyakit berbahaya.',               '💉', 2),
  ('Grooming',                 'Mandi, potong bulu, dan perawatan tampilan agar hewan peliharaanmu selalu bersih, sehat, dan wangi.',                  '✂️', 3),
  ('Petshop Lengkap',          'Makanan premium, vitamin, aksesoris, dan kebutuhan harian tersedia lengkap di satu tempat.',                          '🛍️', 4),
  ('Laboratorium & Diagnosa',  'Pemeriksaan darah, feses, dan urin untuk memastikan kondisi kesehatan hewan peliharaanmu secara menyeluruh.',         '🔬', 5),
  ('Rawat Inap',               'Fasilitas rawat inap nyaman dan bersih dengan pemantauan intensif untuk pemulihan yang optimal.',                      '🏥', 6);

insert into testimonials (author, text, is_visible) values
  ('Rina A.',  'Dokternya sangat ramah dan sabar menjelaskan kondisi kucing saya. Tidak terasa terburu-buru sama sekali. Kliniknya bersih dan nyaman, pasti balik lagi!', true),
  ('Budi S.',  'Sudah 2 tahun bawa anjing kesini untuk vaksin rutin. Pelayanannya konsisten bagus, harganya juga sangat terjangkau. Sangat rekomendasikan!',            true),
  ('Dewi P.',  'Grooming-nya rapi banget! Kucing saya yang biasanya susah dipegang, justru kalem waktu di OSHA. Kelihatan nyaman ditangani. Terima kasih!',             true);
