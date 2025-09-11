import { Suspense, lazy, useEffect, useState } from 'react';
import Loader from './components/Loader';
import NotFoundPage from './pages/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './app.css';
import PrivateRoute from './components/PrivateRoute';
import { fetchData, getFavorites } from './redux/nanniesOperation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './redux/store';
import {
  selectAllNannies,
  selectCurrentFavorites,
  selectCurrentNannies,
  selectIsFirstLoad,
  selectIsLogged,
} from './redux/selectors';
import { SingleValue } from 'react-select';
import { OptionType } from './pages/NanniesPage';
import { options } from './components/Filters';
import { optionSwitch } from './utils/optionSwitch';

const HomePage = lazy(() => import('./pages/HomePage'));
const NanniesPage = lazy(() => import('./pages/NanniesPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLogged);
  const allNannies = useSelector(selectAllNannies);
  const isFirstLoad = useSelector(selectIsFirstLoad);
  const currentNannies = useSelector(selectCurrentNannies);
  const currentFavorites = useSelector(selectCurrentFavorites);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getFavorites());
    }
  }, [dispatch, isLoggedIn, allNannies]);

  useEffect(() => {
    if (!isFirstLoad) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [currentNannies, currentFavorites, isFirstLoad]);

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/nannies' element={<NanniesPage />} />
          <Route
            path='/favorites'
            element={
              <PrivateRoute redirectTo='/' component={<FavoritesPage />} />
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
