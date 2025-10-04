'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../infrastructure/api';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import { toggleFavourite } from '../../store/slices/favouritesSlice';
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { motion } from 'framer-motion';
import Hero from '../../presentation/organisms/Hero';
import { useTranslations } from 'next-intl';
import { Product } from '../../domain/models';
import { useFavourites } from 'hooks/useFavourites';
import { useCart } from 'hooks/useCart';




export default function HomePage() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const { favourites } = useFavourites();
  const { cart, add } = useCart();

  const [selected, setSelected] = useState<Product | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; msg: string }>({ open: false, msg: '' });
  const [lastRemoved, setLastRemoved] = useState<Product | null>(null);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const handleAddToCart = (product: Product) => {
    const alreadyInCart = cart.some((item) => item.productId === product.id);
    if (alreadyInCart) {
      setSnackbar({ open: true, msg: `${product.title} is already in your cart ⚠️` });
      return;
    }
    add({ ...product, productId: product.id, quantity: 1 });
    setSnackbar({ open: true, msg: `${product.title} added to cart successfully ✅` });
  };

  const handleToggleFavourite = (product: Product) => {
    const isFav = favourites.includes(product.id);
    if (isFav) setLastRemoved(product);
    else setLastRemoved(null);

    dispatch(toggleFavourite(product.id));

    setSnackbar({
      open: true,
      msg: isFav ? `${product.title} removed from favourites 💔` : `${product.title} added to favourites ❤️`,
    });

    if (selected?.id === product.id && isFav) setSelected(null);
  };

  const handleUndo = () => {
    if (lastRemoved) {
      dispatch(toggleFavourite(lastRemoved.id));
      setSnackbar({ open: true, msg: `${lastRemoved.title} restored! 💜` });
      setLastRemoved(null);
    }
  };

  return (
    <>
      <Hero />
      <Box id="main-content" tabIndex={-1} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          {t('products')}
        </Typography>

        {isLoading ? (
          <Typography>{t('loading')}</Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 2,
            }}
          >
            {products.map((product) => (
              <motion.div key={product.id} whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.18 }}>
                <Box
                  sx={{
                    border: '1px solid #eee',
                    borderRadius: 3,
                    p: 2,
                    boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    backgroundColor: '#fff',
                  }}
                >
                  <img
                    src={product.image || '/images/Minimal_Wireless_Headphones.png'}
                    alt={product.title}
                    style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, cursor: 'pointer' }}
                    onClick={() => setSelected(product)}
                  />

                  <Typography variant="subtitle1" fontWeight="600" onClick={() => setSelected(product)}>
                    {product.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    ${product.price.toFixed(2)} &nbsp; | &nbsp; ⭐ {product.rating ?? 'N/A'}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <motion.div whileTap={{ scale: 1.15 }}>
                      <IconButton onClick={() => handleAddToCart(product)} sx={{ color: 'purple' }}>
                        <AddShoppingCartIcon />
                      </IconButton>
                    </motion.div>

                    <motion.div
                      whileTap={{ scale: 1.2 }}
                      animate={favourites.includes(product.id) ? { scale: [1, 1.12, 1] } : {}}
                    >
                      <IconButton
                        onClick={() => handleToggleFavourite(product)}
                        sx={{ color: favourites.includes(product.id) ? '#e41313ff' : 'grey' }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </motion.div>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        )}
      </Box>

      {/* Product Dialog */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
      >
        {selected && (
          <>
            <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', color: 'purple' }}>
              {selected.title}
              <IconButton onClick={() => setSelected(null)} sx={{ position: 'absolute', right: 8, top: 8 }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src={selected.image || '/images/Minimal_Wireless_Headphones.png'}
                  alt={selected.title}
                  style={{
                    width: '80%',
                    maxHeight: 250,
                    objectFit: 'cover',
                    borderRadius: 12,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    marginBottom: 16,
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ mt: 1, fontWeight: 600, color: 'purple', textAlign: 'center' }}
              >
                ${selected.price.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                ⭐ {selected.rating ?? 'N/A'}
              </Typography>
              <Typography sx={{ mt: 2, textAlign: 'justify', lineHeight: 1.6 }}>
                {selected.description || 'No description available.'}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                <Button
                  variant="contained"
                  sx={{ bgcolor: 'purple', '&:hover': { bgcolor: '#9b30ff' } }}
                  onClick={() => {
                    handleAddToCart(selected);
                    setSelected(null);
                  }}
                >
                  Add to cart
                </Button>
                <Button
                  variant="outlined"
                  color={favourites.includes(selected.id) ? 'error' : 'inherit'}
                  onClick={() => {
                    handleToggleFavourite(selected);
                    setSelected(null);
                  }}
                >
                  {favourites.includes(selected.id) ? 'Remove favourite' : 'Add favourite'}
                </Button>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={() => setSnackbar({ open: false, msg: '' })}
        message={snackbar.msg}
        action={
          lastRemoved ? (
            <Button color="secondary" size="small" onClick={handleUndo}>
              UNDO
            </Button>
          ) : null
        }
      />
    </>
  );
}
