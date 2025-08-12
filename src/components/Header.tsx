import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <div className='h-22 flex justify-between items-center px-24 py-5 border-b-[rgba(251,251,251,0.4)] border-b border-solid'>
      <Link
        to='/'
        className='font-medium text-2xl leading-[117%] tracking-[-0.02em] text-[#fbfbfb]'
      >
        Nanny.Services
      </Link>
      <div className='flex text-[#fbfbfb]'>
        <nav className='mr-[92px]'>
          <ul className='flex font-normal text-base leading-[125%] tracking-[-0.01em] gap-10 py-[14px]'>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/nannies'>Nannies</NavLink>
            </li>
          </ul>
        </nav>
        <ul className='flex gap-2'>
          <li>
            <button
              type='button'
              className='border w-[124px] h-12 flex justify-center items-center rounded-[30px] border-solid border-[rgba(251,251,251,0.4)]'
            >
              Log In
            </button>
          </li>
          <li>
            <button
              type='button'
              className='w-[168px] h-12 bg-[#103931] px-10 py-3.5 rounded-[30px] hover:bg-[#fbfbfb] hover:text-[#103931] duration-300'
            >
              Registration
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
