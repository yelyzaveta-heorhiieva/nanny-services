import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { get, ref, remove, set } from 'firebase/database';
import { db } from '../../firebase';
import { queryParams } from '../utils/queryParams';
import { FirebaseError } from 'firebase/app';
import toast from 'react-hot-toast';
import { NannieCardInterface, Params } from '../pages/NanniesPage';

export const fetchData = createAsyncThunk(
  'nannies/getAll',
  async (params: Params, thunkAPI) => {
    try {
      const q = queryParams(params);
      const snapshot = await get(q);
      
      if (snapshot.exists()) {
        const data: NannieCardInterface[] = [];
        snapshot.forEach((childSnap) => {
          data.push({
            ...(childSnap.val() as NannieCardInterface),
          });
        });
        const sorted = params.order === 'inc' ? data : [...data].reverse();
        return sorted;
      }
      if (!snapshot.exists()) return thunkAPI.rejectWithValue('Data is not found');
    } catch (e: any) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const getFavorites = createAsyncThunk('nannies/getFavorite', async (_, thunkAPI) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return thunkAPI.rejectWithValue('User not authenticated');

    const favRef = ref(db, `users/${user.uid}/favorites`);
    const snapshot = await get(favRef);

    if (snapshot.exists()) {
      const raw = snapshot.val();
      const data: string[] = Object.keys(raw);
      return data;
    } 
    if (!snapshot.exists()) return thunkAPI.rejectWithValue('Data is not found');
  } catch (e) {
    const err = e as FirebaseError;
    return thunkAPI.rejectWithValue(err.message);
  }
});


export const toggleFavorite = createAsyncThunk('nannies/toggleFavorite', async (productId: string, thunkAPI) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      toast.error('Please log in or sign up');
      return thunkAPI.rejectWithValue('User not authenticated');
    }

    const favRef = ref(db, `users/${user.uid}/favorites/${productId}`);
    const snapshot = await get(favRef);

    if (snapshot.exists()) {
      await remove(favRef);
      toast.success('Deleted from favorite');
      return { status: 'removed', productId };
    } else {
      await set(favRef, true);
      toast.success('Added to favorite');
      return { status: 'added', productId };
    }
  } catch (e) {
    const err = e as FirebaseError;
    return thunkAPI.rejectWithValue(err.message);
  }
});
