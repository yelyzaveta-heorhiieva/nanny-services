import { Link, useLocation } from 'react-router-dom';
import Modal from './Modal';
import Navigation from './Navigation';
import Container from './Container';
import { useSelector } from 'react-redux';
import AuthForm from './AuthForm';
import {
  selectLoginFormIsOpen,
  selectModalIsOpen,
  selectRegisterFormIsOpen,
} from '../redux/selectors';
import UserActions from './UserActions';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileMenu from './MobileMenu';

export interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const location = useLocation();
  const registerFormIsOpen = useSelector(selectRegisterFormIsOpen);
  const loginFormIsOpen = useSelector(selectLoginFormIsOpen);
  const [menuOpen, setMenuOpen] = useState(false);
  const isBigScreen = useMediaQuery({ query: '(min-width: 1280px)' });
   const isMediumScreen = useMediaQuery({
     query: '(min-width: 480px)',
   });

  return (
    <div
      className={` bg-[#103931] border-b-[rgba(251,251,251,0.4)]  
      border-b border-solid ${
        location.pathname === '/'
          ? 'xls:m-8 m-4 bg-transparent absolute z-[899] min-w-[288px] w-[80vw]  xls:w-[1376px]'
          : 'fixed z-[899] top-0 left-0 min-w-[320px] w-full xls:min-w-[1440px]'
      }`}
    >
      <Container>
        <div className='h-[88px] flex justify-between items-center py-5 '>
          <Link
            to='/'
            className='font-medium text-2xl leading-[117%] tracking-[-0.02em] text-[#fbfbfb]'
          >
            Nanny.Services
          </Link>
          {!isBigScreen ? (
            <button type='button' onClick={() => setMenuOpen((prev) => !prev)}>
              <svg width='26' height='26' className='fill-white'>
                <use href='/icons.svg#burger'></use>
              </svg>
            </button>
          ) : (
            <div className='flex flex-col xl:flex-row items-center text-[#fbfbfb]'>
              <Navigation />
              <UserActions />
            </div>
          )}

          <div
            className={`fixed top-0 right-0 z-[1000] h-full w-full bg-[#103931]  
            ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-500`}
          >
            {menuOpen && (
              <MobileMenu onClick={() => setMenuOpen((prev) => !prev)} />
            )}
          </div>

          {(registerFormIsOpen || loginFormIsOpen) && (
            <Modal
              classes={
                isMediumScreen ? 'max-w-[565px] min-w-[288px]' : 'w-[288px]'
              }
            >
              <AuthForm />
            </Modal>
          )}
        </div>
      </Container>
    </div>
  );
}
