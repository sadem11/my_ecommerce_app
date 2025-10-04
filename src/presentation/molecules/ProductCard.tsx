'use client'; 
import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import { toggleFavourite } from '../../store/slices/favouritesSlice';

interface ProductCardProps {
  product: {
    id: number;
    title: string; // matches db.json
    price: number;
    image: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '12px',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {/* Image */}
      <div style={{ width: '100%', height: '120px', position: 'relative' }}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: 'cover', borderRadius: '4px' }}
        />
      </div>

      {/* Title & Price */}
      <div style={{ fontWeight: 'bold' }}>{product.title}</div>
      <div>${product.price}</div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() =>
            dispatch(
              addItem({ productId: product.id, title: product.title, price: product.price,  description: product.description, // <-- add this
        image: product.image,    quantity: 1 })
            )
          }
        >
          Add
        </button>
        <button onClick={() => dispatch(toggleFavourite(product.id))}>Fav</button>
      </div>
    </div>
  );
}