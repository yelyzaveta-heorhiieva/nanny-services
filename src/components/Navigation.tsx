import { useSelector } from 'react-redux';
import NavItem from './NavItem';
import { selectIsLogged } from '../redux/selectors';

export interface NavigationProps {
}


export default function Navigation({ }: NavigationProps) {
  const isLogged = useSelector(selectIsLogged);

  return (
    <nav className='mr-[92px]'>
      <ul className='flex font-normal text-base leading-[125%] tracking-[-0.01em] gap-10 py-[14px]'>
        <NavItem link='/' name='Home' />
        <NavItem link='/nannies' name='Nannies' />
        {isLogged && <NavItem link='/favorites' name='Favorites' />}
      </ul>
    </nav>
  );
}
