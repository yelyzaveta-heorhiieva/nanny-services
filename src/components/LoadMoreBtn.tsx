import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { selectLoading } from '../redux/selectors';
import { loadMore } from '../redux/nanniesSlice';
import { NannieCardInterface } from '../pages/NanniesPage';

export interface LoadMoreBtnProps {
  onClick: () => void;
}

export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  // const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);

  return (
    <button
      onClick={onClick ?? undefined}
      disabled={loading}
      type='button'
      className=' w-[159px] h-12 rounded-[30px] bg-[#103931] font-medium leading-[125%] tracking-[-0.01em] 
            text-[#fbfbfb] mb-[100px] mx-auto'
    >
      Load more
    </button>
  );
}
