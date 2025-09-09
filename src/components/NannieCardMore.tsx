import React from 'react';
import { NannieCardInterface, Review } from '../pages/NanniesPage';
import ReviewItem from './ReviewItem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { openPopUp } from '../redux/modalSlice';
import { selectPopUpIsOpen } from '../redux/selectors';
import Modal from './Modal';
import AppointmentForm from './AppointmentForm';

export interface NannieCardMoreProps {
  item: NannieCardInterface;
}

export default function NannieCardMore({ item }: NannieCardMoreProps) {
  const dispatch = useDispatch<AppDispatch>();
  const popUpIsOpen = useSelector(selectPopUpIsOpen);

  const { reviews, avatar_url, name } = item;

  const handleClick = () => {
    dispatch(openPopUp());
  };

  return (
    <div>
      <ul className='mt-[10px] flex gap-[25px] flex-col mb-12'>
        {reviews.map((item, i) => (
          <li key={item.reviewer + i}>
            <ReviewItem {...item} />
          </li>
        ))}
      </ul>
      <button
        type='button'
        className='w-[215px] h-12 bg-[#103931] flex items-center justify-center rounded-[30px] 
              font-medium leading-[125%] tracking-[-0.01em] text-[#fbfbfb]'
        onClick={handleClick}
      >
        Make an appointment
      </button>
      {popUpIsOpen && (
        <Modal width='max-w-[599px]'>
          <>
            <h2 className='font-medium text-[40px] leading-[120%] tracking-[-0.02em] text-[#11101c] mb-5'>
              Make an appointment with a babysitter
            </h2>
            <p className='font-normal leading-[125%] text-[rgba(17,16,28,0.5)] mb-10'>
              Arranging a meeting with a caregiver for your child is the first
              step to creating a safe and comfortable environment. Fill out the
              form below so we can match you with the perfect care partner.
            </p>
            <div className='flex gap-[14px] items-center mb-10'>
              <img
                src={avatar_url}
                alt={name}
                className='w-11 max-h-11 rounded-[15px]'
              />
              <div>
                <p className='font-medium text-xs leading-[133%] text-[#8a8a89] mb-1'>
                  Your nanny
                </p>
                <h3 className='font-medium leading-[150%] text-[#11101c]'>
                  {name}
                </h3>
              </div>
            </div>
            <AppointmentForm />
          </>
        </Modal>
      )}
    </div>
  );
}
