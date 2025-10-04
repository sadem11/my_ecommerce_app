// src/services/queryClient.ts
'use client';
import { QueryClient } from '@tanstack/react-query';


export function createQueryClient() {
return new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60 * 2 } } });
}