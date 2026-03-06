export type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  created_at: string;
};

export type Testimonial = {
  id: string;
  author: string;
  text: string;
  is_visible: boolean;
  created_at: string;
};

export type Lead = {
  id: string;
  name: string;
  pet_type: string;
  created_at: string;
};

export type PetType = 'Kucing' | 'Anjing' | 'Lainnya';
