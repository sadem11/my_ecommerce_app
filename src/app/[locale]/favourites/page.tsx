'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Snackbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useFavourites } from '../../../hooks/useFavourites';
import { useCart } from '../../../hooks/useCart';
import { useDispatch } from 'react-redux';
import { toggleFavourite, clearFavourites } from '../../../store/slices/favouritesSlice';
import { motion } from 'framer-motion';

export default function FavouritesPage() {
  const { favourites } = useFavourites();
  const { cart, add } = useCart();
  const dispatch = useDispatch();

  const [products, setProducts] = useState<any[]>([]);
  const [snackbar, setSnackbar] = useState<{ open: boolean; msg: string }>({ open: false, msg: '' });
  const [selected, setSelected] = useState<any | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // New state for UNDO feature
  const [lastRemoved, setLastRemoved] = useState<any | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const favouriteProducts = products.filter((p) => favourites.includes(p.id));

  // Adds product to cart — only if not already in cart
  const handleAddToCart = (item: any) => {
    const alreadyInCart = cart.some((cartItem: any) => cartItem.productId === item.id);
    if (alreadyInCart) {
      setSnackbar({ open: true, msg: `${item.title} is already in your cart ⚠️` });
      return;
    }
    const payload = { ...item, productId: item.id, quantity: 1 };
    add(payload);
    setSnackbar({ open: true, msg: `${item.title} added to cart successfully` });
  };

  const handleToggleFavourite = (item: any) => {
    const isFav = favourites.includes(item.id);

    if (isFav) {
      setLastRemoved(item); // store removed favourite for UNDO
    } else {
      setLastRemoved(null);
    }

    dispatch(toggleFavourite(item.id));

    setSnackbar({
      open: true,
      msg: isFav ? `${item.title} removed from favourites 💔` : `${item.title} added to favourites ❤️`,
    });
  };

  // UNDO handler
  const handleUndo = () => {
    if (lastRemoved) {
      dispatch(toggleFavourite(lastRemoved.id)); // restore favourite
      setSnackbar({ open: true, msg: `${lastRemoved.title} restored! 💜` });
      setLastRemoved(null);
    }
  };

  const handleClearAll = () => setConfirmOpen(true);
  const confirmClearAll = () => {
    dispatch(clearFavourites());
    setConfirmOpen(false);
    setSnackbar({ open: true, msg: 'All favourites cleared 💔' });
  };

  if (favouriteProducts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No favourite products yet 💜
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => (window.location.href = '/')}>
          Browse Products
        </Button>
      </Box>
    );
  }

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold">
          Your Favourites ❤️
        </Typography>
        <Button variant="outlined" color="error" onClick={handleClearAll}>
          Clear All Favourites
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 2,
        }}
      >
        {favouriteProducts.map((item) => (
          <motion.div key={item.id} whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.18 }}>
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
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, cursor: 'pointer' }}
                onClick={() => setSelected(item)}
              />

              <Typography variant="subtitle1" fontWeight="600" sx={{ cursor: 'pointer' }} onClick={() => setSelected(item)}>
                {item.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                ${item.price} &nbsp; | &nbsp; ⭐ {item.rating}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <motion.div whileTap={{ scale: 1.15 }}>
                  <IconButton onClick={() => handleAddToCart(item)} sx={{ color: 'purple' }}>
                    <AddShoppingCartIcon />
                  </IconButton>
                </motion.div>

                <motion.div whileTap={{ scale: 1.2 }} animate={favourites.includes(item.id) ? { scale: [1, 1.12, 1] } : {}}>
                  <IconButton
                    onClick={() => handleToggleFavourite(item)}
                    sx={{ color: favourites.includes(item.id) ? '#e41313ff' : 'grey' }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>

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

     <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 2 } }}>
  {selected && (
    <>
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', color: 'purple' }}>
        {selected.title}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center' }}>
          <img
            src={selected.image}
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
        <Typography variant="h6" sx={{ mt: 1, fontWeight: 600, color: 'purple', textAlign: 'center' }}>
          ${selected.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
          ⭐ {selected.rating}
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
            color="error"
            onClick={() => {
              handleToggleFavourite(selected);
              setSelected(null); // Close dialog immediately
            }}
          >
            {favourites.includes(selected.id) ? 'Remove favourite' : 'Add favourite'}
          </Button>
        </Box>
      </DialogContent>
    </>
  )}
</Dialog>


      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Clear all favourites?</DialogTitle>
        <DialogContent sx={{ display: 'flex', gap: 1, pt: 2 }}>
          <Button variant="contained" color="error" onClick={confirmClearAll}>
            Yes, clear all
          </Button>
          <Button variant="outlined" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
