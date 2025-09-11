import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoginFormIsOpen } from '../redux/selectors';

export interface AuthHeaderProps {}

export default function AuthHeader({ }: AuthHeaderProps) {
    const loginFormIsOpen = useSelector(selectLoginFormIsOpen);

  return (
    <>
      <h3 className='font-medium md:text-[40px] text-2xl leading-[120%] tracking-[-0.02em] text-[#11101c] mb-5'>
        {loginFormIsOpen ? 'Log In' : 'Registration'}
      </h3>
      <p className='font-normal xl:text-base text-sm leading-[125%] text-[rgba(17,16,28,0.5)] mb-10'>
        {loginFormIsOpen
          ? 'Welcome back! Please enter your credentials to access your account and continue your babysitter search.'
          : 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'}
      </p>
    </>
  );
};
