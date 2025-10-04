'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../infrastructure/api';
import ProductCard from '../presentation/molecules/ProductCard';

export default function HomePage() {
  const { data: products = [] } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '16px' }}>
      {products.map((p: any) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
