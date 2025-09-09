import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { closeModal } from '../redux/modalSlice';

export interface ModalProps {
  children: ReactElement;
  width: string;
}

export default function Modal({ children, width = "565" }: ModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeModal());
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dispatch]);

  return (
    <div
      className='fixed top-0 left-0 w-full h-full bg-[rgba(11,11,11,0.6)] z-[999]'
      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
        (e.target as HTMLElement).classList.contains('z-[999]') &&
        dispatch(closeModal())
      }
    >
      <div
        className={`absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-[#fbfbfb] 
      rounded-[30px] p-16 ${width} z-[1000]`}
      >
        <button
          type='button'
          onClick={() => dispatch(closeModal())}
          className='absolute top-5 right-5 w-8 h-8 flex justify-center items-center'
        >
          <svg width='32' height='32' className='stroke-[#11101C] stroke-[2.5]'>
            <use href='/icons.svg#close'></use>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
