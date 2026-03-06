import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Testimonial } from '../types';

const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_visible', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });
};
