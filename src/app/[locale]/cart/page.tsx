  'use client';

  import React, { useEffect, useState } from 'react';
  import { Box, Button, Typography, Stack, IconButton, Snackbar } from '@mui/material';
  import AddIcon from '@mui/icons-material/Add';
  import RemoveIcon from '@mui/icons-material/Remove';
  import DeleteIcon from '@mui/icons-material/Delete';
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import { motion } from 'framer-motion';
  import { useCart } from '../../../hooks/useCart';
  import { useTranslations } from '../../../hooks/useTranslations';
  import { useDispatch } from 'react-redux';
  import { toggleFavourite } from '../../../store/slices/favouritesSlice';
  import { useFavourites } from '../../../hooks/useFavourites';

  export default function CartPage() {
    const { cart, update, remove, clear, add } = useCart();
    const t = useTranslations();
    const dispatch = useDispatch();
    const { favourites } = useFavourites();

    const [products, setProducts] = useState<any[]>([]);
    const [snackbar, setSnackbar] = useState<{ open: boolean; lastItem?: any }>({ open: false });

    // Fetch all products
    useEffect(() => {
      fetch('http://localhost:4000/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);

    // Merge cart items with product details
    const detailedCart = cart.map((item: any) => {
      const product = products.find(p => p.id === item.productId);
      return { ...product, ...item };
    });

    // Cart total
    const cartTotal = detailedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Remove with snackbar
    const handleRemove = (item: any) => {
      remove(item.productId);
      setSnackbar({ open: true, lastItem: item });
    };

    // Undo remove
    const handleUndo = () => {
      if (snackbar.lastItem) {
        add(snackbar.lastItem);
      }
      setSnackbar({ open: false });
    };

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>{t('cart')}</Typography>

        {cart.length === 0 ? (
          <Typography>{t('cartEmpty') || 'Cart is empty'}</Typography>
        ) : (
          <Stack spacing={2} sx={{ mb: 12 }}>
            {detailedCart.map((item: any) => (
              <Box
                key={item.productId}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  p: 1,
                  gap: 2,
                }}
              >
                {/* Product details with image */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 6 }}
                    />
                  )}
                  <Box>
                    <Typography variant="subtitle1">{t('name')}: {item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{t('price')}: ${item.price}</Typography>
                    <Typography variant="body2" color="text.secondary">{t('description')}: {item.description}</Typography>
                    <Typography variant="body2" color="text.secondary">{t('rating')}: {item.rating}</Typography>
                    <Typography variant="body2" color="text.secondary">Subtotal: ${item.price * item.quantity}</Typography>
                  </Box>
                </Box>

                {/* Quantity controls */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {item.quantity > 1 && (
                    <IconButton size="small" onClick={() => update({ ...item, quantity: item.quantity - 1 })}>
                      <RemoveIcon />
                    </IconButton>
                  )}

                  <Typography variant="h6" sx={{ minWidth: 20, textAlign: 'center' }}>
                    <motion.span
                      key={item.quantity}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.quantity}
                    </motion.span>
                  </Typography>

                  <IconButton size="small" onClick={() => update({ ...item, quantity: item.quantity + 1 })}>
                    <AddIcon />
                  </IconButton>
                </Box>

                {/* Heart favourite button */}
                <IconButton
                  onClick={() => dispatch(toggleFavourite(item.productId))}
                  sx={{ color: favourites.includes(item.productId) ? '#e41313ff' : 'grey', fontSize: 28 }}
                >
                  <FavoriteIcon fontSize="large" />
                </IconButton>

                {/* Remove button */}
                <IconButton
                  onClick={() => handleRemove(item)}
                  sx={{ color: 'purple', fontSize: 32 }}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </Box>
            ))}

            {/* Clear cart */}
            <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={clear}>
              {t('clearCart')}
            </Button>
          </Stack>
        )}

        {/* Premium animated total card */}
        {cart.length > 0 && (
          <motion.div
            key={cartTotal} // animate when total changes
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
            
              position: 'fixed',
              bottom: 16,
              right: 16,
              padding: '16px 24px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              color: 'white',
              minWidth: 200,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 'bold',
            }}
          >
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h5">${cartTotal}</Typography>
          </motion.div>
        )}

        {/* Snackbar for undo */}
        <Snackbar
          open={snackbar.open}
          message={`${snackbar.lastItem?.title} removed from cart`}
          action={<Button color="secondary" onClick={handleUndo}>Undo</Button>}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ open: false })}
        />
      </Box>
    );
  }
