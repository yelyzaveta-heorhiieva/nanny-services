import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { selectIsLogged, selectUser } from '../redux/selectors';
import { logOut } from '../redux/authOperations';
import { openLogInModal, openRegisterModal } from '../redux/modalSlice';

export interface UserActionsProps {}

export default function UserActions({ }: UserActionsProps) {
      const dispatch = useDispatch<AppDispatch>();
      const user = useSelector(selectUser);
    const isLogged = useSelector(selectIsLogged);
    
  return (
    <>
      {isLogged ? (
        <>
          <p className='flex items-center gap-[14px] mr-6 font-medium text-lg leading-[111%] tracking-[-0.01em] text-[#fbfbfb]'>
            <span className='flex items-center justify-center size-10 bg-[#fbfbfb] rounded-[10px]'>
              <svg width='16' height='16' className='fill-[#103931]'>
                <use href='/icons.svg#user'></use>
              </svg>
            </span>
            {user}
          </p>
          <button
            onClick={() => dispatch(logOut())}
            type='button'
            className='border w-[134px] h-12 flex justify-center items-center rounded-[30px] border-solid border-[rgba(251,251,251,0.4)]'
          >
            Log out
          </button>
        </>
      ) : (
        <ul className='flex gap-2'>
          <li>
            <button
              onClick={() => dispatch(openLogInModal())}
              type='button'
              className='border w-[124px] h-12 flex justify-center items-center rounded-[30px] border-solid border-[rgba(251,251,251,0.4)]'
            >
              Log In
            </button>
          </li>
          <li>
            <button
              onClick={() => dispatch(openRegisterModal())}
              type='button'
              className='w-[168px] h-12 bg-[#103931] px-10 py-3.5 rounded-[30px] hover:bg-[#fbfbfb] hover:text-[#103931] duration-300'
            >
              Registration
            </button>
          </li>
        </ul>
      )}
    </>
  );
};
