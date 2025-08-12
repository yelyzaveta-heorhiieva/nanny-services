import { Suspense, lazy } from 'react';
import Loader from './components/Loader';
import NotFoundPage from './pages/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './app.css'

const HomePage = lazy(() => import('./pages/HomePage'));
const NanniesPage = lazy(() => import('./pages/NanniesPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));

function App() {
  return (
    <>
      {/* <Header /> */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/nannies' element={<NanniesPage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
