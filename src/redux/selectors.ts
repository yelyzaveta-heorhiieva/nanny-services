import { RootState } from "./store";

export const selectIsLogged = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;


export const selectLoginFormIsOpen = (state: RootState) => state.modal.logIn;
export const selectRegisterFormIsOpen = (state: RootState) => state.modal.register;
export const selectModalIsOpen = (state: RootState) => state.modal.modalIsOpen;
export const selectPopUpIsOpen = (state: RootState) => state.modal.popUp;

export const selectFavorites = (state: RootState) => state.nannies.favorites;
export const selectItems = (state: RootState) => state.nannies.items;
export const selectCursor = (state: RootState) => state.nannies.cursor;
export const selectLoading = (state: RootState) => state.nannies.loading;
export const selectError = (state: RootState) => state.nannies.error;
export const selectHasMore = (state: RootState) => state.nannies.hasMore;