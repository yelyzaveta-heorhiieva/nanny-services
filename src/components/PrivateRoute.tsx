
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export interface PrivateRouteProps {
  component: ReactElement;
    redirectTo: string;
}

export default function PrivateRoute({
  component: Component,
  redirectTo = '/'
}: PrivateRouteProps) {

    const isLogged = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLogged ? Component : <Navigate to={redirectTo} />;
}
