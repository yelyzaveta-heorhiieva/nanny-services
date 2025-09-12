import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import {
  equalTo,
  get,
  orderByChild,
  query,
  ref,
  remove,
  set,
} from 'firebase/database';
import { db } from '../../firebase';
import toast from 'react-hot-toast';
import { Params } from '../pages/NanniesPage';
import { getPage } from '../utils/newFilters';

export const fetchData = createAsyncThunk(
  'nannies/getAll',
  async (params: Params, thunkAPI) => {
    try {
      const res = await getPage(
        'nannies',
        params.filter,
        params.cursor,
        params.pageSize,
      );
      return res;
    } catch (e: any) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const loadMore = createAsyncThunk(
  'nannies/loadMore',
  async (params: Params, thunkAPI) => {
    try {
      const res = await getPage(
        'nannies',
        params.filter,
        params.cursor,
        params.pageSize,
      );
      return res;
    } catch (e: any) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const getFavorites = createAsyncThunk(
  'nannies/getFavorite',
  async (_, thunkAPI) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return thunkAPI.rejectWithValue('User not authenticated');

      const favRef = ref(db, `users/${user.uid}/favorites`);
      const snapshot = await get(favRef);

      if (!snapshot.exists())
        return thunkAPI.rejectWithValue('Data is not found');

      const raw = snapshot.val();
      const data: string[] = Object.keys(raw);

      const items = await Promise.all(
        data.map(async (i) => {
          const baseRef = ref(db, 'nannies');
          const snap = await get(
            query(baseRef, orderByChild('id'), equalTo(i)),
          );

          if (!snap.exists()) return null;

          const nannies: any[] = [];
          snap.forEach((child) => {
            nannies.push({
              id: child.key as string,
              ...(child.val() as object),
            });
          });
          return nannies[0];
        }),
      );

      return items.filter(Boolean);
    } catch (e: any) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
export const toggleFavorite = createAsyncThunk(
  'nannies/toggleFavorite',
  async (productId: string, thunkAPI) => {
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
    } catch (e: any) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
