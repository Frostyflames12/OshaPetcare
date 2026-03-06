import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Service } from '../types';

const fetchServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order', { ascending: true });

  if (error) throw error;
  return data;
};

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });
};
