// src/domain/models.ts
export interface Product {
id: number;
title: string;
description: string;
price: number;
image?: string;
category?: string;
rating?: number;
stock?: number;
favourite?: boolean;
}


export interface CartItem {
 productId: number;
  title: string;
  description: string;
  price: number;
  rating?: number;
  image?: string;
  quantity: number;
}