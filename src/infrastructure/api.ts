// src/infrastructure/api.ts
import { Product } from '@/domain/models';


const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';


export async function fetchProducts(): Promise<Product[]> {
const res = await fetch(`${API_BASE}/products`);
if (!res.ok) throw new Error('Failed to fetch products');
return res.json();
}


export async function fetchProductById(id: number): Promise<Product> {
const res = await fetch(`${API_BASE}/products/${id}`);
if (!res.ok) throw new Error('Product not found');
return res.json();
}


export async function patchProduct(id: number, patch: Partial<Product>) {
const res = await fetch(`${API_BASE}/products/${id}`, {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(patch),
});
if (!res.ok) throw new Error('Failed to patch product');
return res.json();
}


export async function createProduct(payload: Partial<Product>) {
const res = await fetch(`${API_BASE}/products`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
if (!res.ok) throw new Error('Failed to create product');
return res.json();
}


export async function deleteProduct(id: number) {
const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
if (!res.ok) throw new Error('Failed to delete product');
return true;
}