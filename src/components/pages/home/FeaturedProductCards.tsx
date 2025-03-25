'use client';

import { useAppSelector } from '../../../../store';
import ProductCard from '../../Card/ProductCard';

const FeaturedProductCards = () => {
  const { featuredProducts } = useAppSelector((state) => state.products);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {featuredProducts.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
};

export default FeaturedProductCards;
