import { RootState } from "./store";

export const selectIsLogged = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;


export const selectLoginFormIsOpen = (state: RootState) => state.modal.logIn;
export const selectRegisterFormIsOpen = (state: RootState) => state.modal.register;
export const selectModalIsOpen = (state: RootState) => state.modal.modalIsOpen;
export const selectPopUpIsOpen = (state: RootState) => state.modal.popUp;

export const selectFavorites = (state: RootState) => state.nannies.favorites;
export const selectAllNannies = (state: RootState) => state.nannies.allNannies;
export const selectCurrentNannies = (state: RootState) => state.nannies.currentNannies;
export const selectCurrentIndex = (state: RootState) => state.nannies.currentIndex;
export const selectLoading = (state: RootState) => state.nannies.loading;
export const selectError = (state: RootState) => state.nannies.error;
export const selectCurrentFavorites = (state: RootState) =>
  state.nannies.currentFavorites;
