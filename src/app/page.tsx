import Link from 'next/link';

import HeroSection from '../components/pages/home/HeroSection';
import FeaturedProductCards from '../components/pages/home/FeaturedProductCards';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center">Featured Eyeglasses</h2>
        <FeaturedProductCards />
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <h2 className="text-2xl font-bold text-center">Shop by Category</h2>
        <div className="flex justify-center mt-6 gap-6">
          {['Men', 'Women', 'Kids'].map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}>
              <div className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600">
                {category}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
