import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './authOperations';
import { NannieCardInterface } from '../pages/NanniesPage';
import { fetchData, getFavorites, loadMore, toggleFavorite } from './nanniesOperation';
import { Cursor } from '../utils/newFilters';

export interface NanniesState {
  favorites: NannieCardInterface[];
  loading: boolean;
  error: string | null;
  items: NannieCardInterface[];
  cursor: Cursor;
  hasMore: boolean;
}

const initialState: NanniesState = {
  favorites: [],
  items: [],
  cursor: null,
  hasMore: false,
  loading: false,
  error: null,
};

const nanniesSlice = createSlice({
  name: 'nannies',
  initialState,
  reducers: {
    resetCursor(state) {
      state.cursor = null;
    }
    // loadMore(state, action) {
    //   const nextPage = action.payload.slice(
    //     state.currentIndex,
    //     state.currentIndex + PAGE_SIZE,
    //   );
    //   state.currentNannies = [...state.currentNannies, ...nextPage];
    //   state.currentIndex = state.currentIndex + PAGE_SIZE;
    // },
    // loadMoreFavorites(state, action) {
    //   const nextPage = action.payload.slice(
    //     state.currentIndex,
    //     state.currentIndex + PAGE_SIZE,
    //   );
    //   state.currentFavorites = [...state.currentFavorites, ...nextPage];
    //   state.currentIndex = state.currentIndex + PAGE_SIZE;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.cursor = action.payload.nextCursor;
        state.hasMore = action.payload.hasMore;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadMore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMore.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload.items];
        state.cursor = action.payload.nextCursor;
        state.hasMore = action.payload.hasMore;
        state.loading = false;
      })
      .addCase(loadMore.rejected, (state, action) => {
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
          const item: NannieCardInterface[] = state.items.filter(
            (item) => item.id === productId,
          );
          state.favorites?.push(...item);
        } else {
          state.favorites =
            state.favorites?.filter((item) => item.id !== productId) || [];
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload
      })
      .addCase(getFavorites.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.favorites = [];
      });
  },
});

export const { resetCursor } = nanniesSlice.actions;

export default nanniesSlice.reducer;
