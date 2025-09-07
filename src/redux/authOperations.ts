import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { FormValues } from '../components/AuthForm';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { FirebaseError } from 'firebase/app';

export const register = createAsyncThunk(
  'auth/register',
  async (data: FormValues, thunkAPI) => {
    try {
       const userCredential = await createUserWithEmailAndPassword(
         auth,
         data.email,
         data.password,
       );
       await updateProfile(userCredential.user, {
         displayName: data.name,
       });
      return { name: userCredential.user.displayName, email: userCredential.user.email }
    } catch (e) {
       const err = e as FirebaseError;
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  },
); 

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (data: FormValues, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      return {
        name: userCredential.user.displayName,
        email: userCredential.user.email,
      };
    } catch (e) {
      const err = e as FirebaseError;
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
  try {
    const userCredential = await signOut(auth);
    return userCredential;
  } catch (e) {
    const err = e as FirebaseError;
    toast.error(err.message);
    return thunkAPI.rejectWithValue(err.message);
  }
});
