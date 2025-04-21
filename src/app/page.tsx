import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import HeroSection from '../components/pages/home/HeroSection';
import FeaturedProductCards from '../components/pages/home/FeaturedProductCards';
import ClientComponent from './user/ClientComponent';

export default async function Home() {

  const supabase = createClient(cookies());
  const { data: products, error } = await supabase.from('products').select('*');

  if (error) {
    console.error("Error fetching products:", error);
  }



  return (
    <div className="min-h-screen bg-gray-100">
      Empty
    </div>
  );
}
