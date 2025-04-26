'use client';

import Link from 'next/link';
import { useAppSelector } from '../../../store';
import ProductCard from '../../Card/ProductCard';

const FeaturedProductCards = () => {
  const { featuredProducts } = useAppSelector((state) => state.products);
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {featuredProducts.map((product) => (
        <Link
          key={product.id}
          href={`product/${product.id}`}>
          <ProductCard
            product={product}
            userId={user.id + ''}
          />
        </Link>
      ))}
    </div>
  );
};

export default FeaturedProductCards;
