import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  modalIsOpen: boolean;
  logIn: boolean;
  register: boolean;
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalIsOpen: false,
    logIn: false,
    register: false,
    popUp: false,
  },
  reducers: {
    openPopUp(state) {
      state.modalIsOpen = true;
      state.popUp = true;
    },
    openLogInModal(state) {
      state.modalIsOpen = true;
      state.logIn = true;
    },
    openRegisterModal(state) {
      state.modalIsOpen = true;
      state.register = true;
    },
    closeModal(state) {
      state.modalIsOpen = false;
      state.register = false;
      state.logIn = false;
      state.popUp = false;
    },
  },
});

export const { openPopUp, openLogInModal, openRegisterModal, closeModal } =
  modalSlice.actions;
export default modalSlice.reducer;
