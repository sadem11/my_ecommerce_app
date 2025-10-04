'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../../../infrastructure/api';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../store/slices/cartSlice';
import { toggleFavourite } from '../../../store/slices/favouritesSlice';
import { Product } from '../../../domain/models';

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.id);

  const { data: product } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
  });

  const dispatch = useDispatch();

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: '16px' }}>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <div>${product.price}</div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <button
          onClick={() =>
            dispatch(
              addItem({
                ...product,       
                productId: product.id, 
                quantity: 1,
              })
            )
          }
        >
          Add to Cart
        </button>
        <button onClick={() => dispatch(toggleFavourite(product.id))}>
          Toggle Fav
        </button>
      </div>
    </div>
  );
}
