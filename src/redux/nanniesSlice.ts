import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './authOperations';
import { NannieCardInterface } from '../pages/NanniesPage';
import { fetchData, getFavorites, toggleFavorite } from './nanniesOperation';

export interface NanniesState {
  favorites: NannieCardInterface[];
  loading: boolean;
  error: string | null;
  allNannies: NannieCardInterface[];
  currentNannies: NannieCardInterface[];
  currentFavorites: NannieCardInterface[];
  currentIndex: number;
  isFirstLoad: boolean;
}

const initialState: NanniesState = {
  favorites: [],
  allNannies: [],
  currentNannies: [],
  currentFavorites: [],
  currentIndex: 3,
  loading: false,
  error: null,
  isFirstLoad: true,
};

const PAGE_SIZE = 3;

const nanniesSlice = createSlice({
  name: 'nannies',
  initialState,
  reducers: {
    loadMore(state, action) {
      const nextPage = action.payload.slice(
        state.currentIndex,
        state.currentIndex + PAGE_SIZE,
      );
      state.currentNannies = [...state.currentNannies, ...nextPage];
      state.currentIndex = state.currentIndex + PAGE_SIZE;
      state.isFirstLoad = false;
    },
    loadMoreFavorites(state, action) {
      const nextPage = action.payload.slice(
        state.currentIndex,
        state.currentIndex + PAGE_SIZE,
      );
      state.currentFavorites = [...state.currentFavorites, ...nextPage];
      state.currentIndex = state.currentIndex + PAGE_SIZE;
      state.isFirstLoad = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.currentIndex = 3;
        state.isFirstLoad = true;
        state.loading = false;
        state.allNannies = action.payload || [];
        state.currentNannies =
          state.allNannies?.slice(0, state.currentIndex) || [];
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const { status, productId } = action.payload;

        if (status === 'added') {
          const item: NannieCardInterface[] = state.allNannies.filter(
            (item) => item.id === productId,
          );
          state.favorites?.push(...item);
        } else {
          state.favorites =
            state.favorites?.filter((item) => item.id !== productId) || [];
        }
        state.currentFavorites = state.favorites.slice(0, state.currentIndex);
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isFirstLoad = true;
        state.favorites = state.allNannies.filter((item) =>
          action.payload?.includes(item.id),
        );
        state.currentFavorites = state.favorites.slice(0, state.currentIndex);
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.favorites = [];
      });
  },
});

export const { loadMore, loadMoreFavorites } = nanniesSlice.actions;

export default nanniesSlice.reducer;
