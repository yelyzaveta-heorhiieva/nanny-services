import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { selectIsLogged, selectUser } from '../redux/selectors';
import { logOut } from '../redux/authOperations';
import { openLogInModal, openRegisterModal } from '../redux/modalSlice';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export interface UserActionsProps {
  onClick?: () => void;
}

export default function UserActions({onClick}: UserActionsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const isLogged = useSelector(selectIsLogged);
  const location = useLocation();
  const isBigScreen = useMediaQuery({ query: '(min-width: 1280px)' });

  return (
    <>
      {isLogged ? (
        <>
          <p className='flex items-center gap-[14px] xl:mr-6 mb-8 xl:mb-0 font-medium text-lg leading-[111%] tracking-[-0.01em] text-[#fbfbfb]'>
            <span className='flex items-center justify-center size-10 bg-[#fbfbfb] rounded-[10px]'>
              <svg width='16' height='16' className='fill-[#103931]'>
                <use href='/icons.svg#user'></use>
              </svg>
            </span>
            {user}
          </p>
          <button
            onClick={() => {
              dispatch(logOut())
              onClick?.()
            }
            }
            type='button'
            className='border w-[134px] h-12 flex justify-center items-center rounded-[30px] border-solid
             border-[rgba(251,251,251,0.4)] hover:bg-[#fbfbfb] hover:text-[#103931] duration-300'
          >
            Log out
          </button>
        </>
      ) : (
        <ul className='flex xl:flex-row flex-col items-center xl:gap-2 gap-8'>
          <li>
            <button
                onClick={() => {
                  dispatch(openLogInModal())
                  onClick?.()
                }    
                }
              type='button'
              className='border w-[124px] h-12 flex justify-center items-center rounded-[30px] border-solid border-[rgba(251,251,251,0.4)]
              hover:bg-[#fbfbfb] hover:text-[#103931] duration-300'
            >
              Log In
            </button>
          </li>
          <li>
            <button
                onClick={() => {
                  dispatch(openRegisterModal())
                  onClick?.();
                }
                }
              type='button'
              className={`w-[168px] h-12 px-10 py-3.5 rounded-[30px] border border-solid border-[rgba(251,251,251,0.4)] ${
                location.pathname === '/' && isBigScreen &&
                'bg-[#103931] hover:bg-[#fbfbfb] hover:text-[#103931] border-none'
              } hover:bg-[#fbfbfb] hover:text-[#103931] duration-300`}
            >
              Registration
            </button>
          </li>
        </ul>
      )}
    </>
  );
}
