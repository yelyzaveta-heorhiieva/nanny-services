import { Link, useLocation } from 'react-router-dom';
import Modal from './Modal';
import Navigation from './Navigation';
import Container from './Container';
import { useSelector } from 'react-redux';
import AuthForm from './AuthForm';
import { selectLoginFormIsOpen, selectModalIsOpen, selectRegisterFormIsOpen } from '../redux/selectors';
import UserActions from './UserActions';

export interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const location = useLocation();
  const registerFormIsOpen = useSelector(selectRegisterFormIsOpen);
  const loginFormIsOpen = useSelector(selectLoginFormIsOpen)

  return (
    <div
      className={`fixed z-[999] top-0 bg-[#103931] border-b-[rgba(251,251,251,0.4)] border-b border-solid ${
        location.pathname === '/' && 'm-8 bg-transparent'
      }`}
    >
      <Container>
        <div className='h-[88px] flex justify-between items-center  py-5 '>
          <Link
            to='/'
            className='font-medium text-2xl leading-[117%] tracking-[-0.02em] text-[#fbfbfb]'
          >
            Nanny.Services
          </Link>
          <div className='flex text-[#fbfbfb]'>
            <Navigation />
            <UserActions />
          </div>
          {(registerFormIsOpen || loginFormIsOpen) && (
            <Modal width='w-[565px]'>
              <AuthForm />
            </Modal>
          )}
        </div>
      </Container>
    </div>
  );
}
