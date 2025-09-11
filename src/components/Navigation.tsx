import { useSelector } from 'react-redux';
import NavItem from './NavItem';
import { selectIsLogged } from '../redux/selectors';

export interface NavigationProps {
  onClick?: () => void;
}


export default function Navigation({onClick}: NavigationProps) {
  const isLogged = useSelector(selectIsLogged);

  return (
    <nav className='xl:mr-[92px] my-32  xl:m-0'>
      <ul className='flex xl:flex-row flex-col text-xl font-normal text-center xl:text-base leading-[125%] tracking-[-0.01em] gap-10 xl:py-[14px]'>
        <NavItem link='/' name='Home' onClick={onClick} />
        <NavItem link='/nannies' name='Nannies' onClick={onClick} />
        {isLogged && (
          <NavItem link='/favorites' name='Favorites' onClick={onClick} />
        )}
      </ul>
    </nav>
  );
}
