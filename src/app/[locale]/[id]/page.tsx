'use client';

import React from 'react';
import Image from 'next/image';
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

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
  });

  const dispatch = useDispatch();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Product not found</div>;

  // Use the relative path to public/images
  const src = product.image || '/images/Minimal_Wireless_Headphones.png'; // fallback image

  return (
    <div style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>{product.title}</h2>

      {/* Image */}
      <div style={{ width: '100%', height: '400px', position: 'relative', marginBottom: '16px' }}>
        <Image
          src={src}
          alt={product.title}
          width={800}
          height={400}
          style={{ objectFit: 'cover', borderRadius: '8px' }}
          priority={true} // optional, for hero-like image
        />
      </div>

      <p style={{ marginBottom: '8px', fontSize: '1.1rem' }}>{product.description}</p>
      <div style={{ fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '12px' }}>
        ${product.price.toFixed(2)}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
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
          style={{
            padding: '8px 16px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add to Cart
        </button>

        <button
          onClick={() => dispatch(toggleFavourite(product.id))}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Toggle Fav
        </button>
      </div>
    </div>
  );
}

