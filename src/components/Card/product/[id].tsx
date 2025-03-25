import { useParams } from 'next/navigation';
import React, { FC } from 'react';

const Product: FC<{ id: string }> = ({ id }) => {
  const params = useParams();
  console.log('🚀 ~ params:', params);
  return <div>Product: {params.id}</div>;
};

export default Product;
