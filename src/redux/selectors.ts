import { RootState } from "./store";

export const selectIsLogged = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;


export const selectLoginFormIsOpen = (state: RootState) => state.modal.logIn;
export const selectRegisterFormIsOpen = (state: RootState) => state.modal.register;
export const selectModalIsOpen = (state: RootState) => state.modal.modalIsOpen;
