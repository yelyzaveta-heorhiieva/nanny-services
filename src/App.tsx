import { Suspense, lazy, useEffect} from 'react';
import Loader from './components/Loader';
import NotFoundPage from './pages/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './app.css';
import PrivateRoute from './components/PrivateRoute';
import { getFavorites } from './redux/nanniesOperation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './redux/store';
import {
  selectItems,
  selectIsLogged,
  selectLoading,
} from './redux/selectors';

const HomePage = lazy(() => import('./pages/HomePage'));
const NanniesPage = lazy(() => import('./pages/NanniesPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLogged);
  const items = useSelector(selectItems);
  const loading = useSelector(selectLoading);
 

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getFavorites());
    }
  }, [dispatch, isLoggedIn, items]);


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
      {loading && <Loader />}
    </>
  );
}

export default App;
