import React, { useState } from 'react';
import { NannieCardInterface } from '../pages/NanniesPage';
import NannieFeature from './NannieFeature';
import NanniePoint from './NanniePoint';
import { getAge } from '../utils/getAge';
import { ref, update } from 'firebase/database';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { selectIsLogged } from '../redux/selectors';
import toast from 'react-hot-toast';
import NannieCardMore from './NannieCardMore';

export interface NannieCardProps {
  item: NannieCardInterface;
}

export default function NannieCard({ item }: NannieCardProps) {
  const [readMore, setReadMore] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<boolean>(false);
  const isLoggedIn = useSelector(selectIsLogged);
  const {
    id,
    name,
    avatar_url,
    birthday,
    experience,
    education,
    kids_age,
    price_per_hour,
    location,
    about,
    characters,
    rating,
  } = item;

  const addFavoriteProduct = (
    userId: string | undefined,
    productId: string,
  ) => {
    const updates: any = {};
    updates[`/users/${userId}/favorites/${productId}`] = true;

    update(ref(db), updates)
      .then(() => console.log('Товар додано до улюблених'))
      .catch((err) => console.error('Помилка:', err));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoggedIn) {
      const auth = getAuth();
      const user = auth.currentUser;
      addFavoriteProduct(user?.uid, id);
      setFavorites(true);
    } else {
      toast.error('Please log in or sign up')
    }
  };

  return (
    <>
      <div className='rounded-[30px] border-2 border-solid border-[rgba(240,63,59,0.2)] p-3 min-w-[120px] max-h-[120px] relative'>
        <img
          src={avatar_url}
          alt={name}
          className='w-24 max-h-24 rounded-[15px]'
        />
        <svg width='14' height='14' className='absolute top-[9px] right-[14px]'>
          <use href='/icons.svg#dot'></use>
        </svg>
      </div>
      <div className='w-full'>
        <p className='font-medium leading-[150%] text-[#8a8a89] mb-2'>Nanny</p>
        <h3 className='font-medium text-2xl leading-[100%] text-[#11101c] mb-6'>
          {name}
        </h3>
        <ul className='flex gap-2 flex-wrap mb-6'>
          <NannieFeature feature='Age: ' value={getAge(birthday)} />
          <NannieFeature feature='Experience: ' value={experience} />
          <NannieFeature feature='Kids Age: ' value={kids_age} />
          <NannieFeature feature='Characters: ' value={characters.join(', ')} />
          <NannieFeature feature='Education: ' value={education} />
        </ul>
        <p className='font-normal leading-[125%] text-[rgba(17,16,28,0.5)] mb-[14px]'>
          {about}
        </p>
        <p
          className='font-medium leading-[150%] underline text-[#11101c] text-decoration-skip-none cursor-pointer'
          onClick={() => setReadMore((prev) => !prev)}
        >
          {!readMore ? 'Read more' : 'Read less'}
        </p>
        {readMore && <NannieCardMore item={item} />}
      </div>
      <div className='absolute right-[98px] flex gap-8 font-medium text-[#11101c]'>
        <NanniePoint
          icon='map-pin'
          iconClass='stroke-[1.5] stroke-[#11101C] fill-transparent'
        >
          {location}
        </NanniePoint>
        <NanniePoint icon='star' iconClass=''>
          Rating: {rating}
        </NanniePoint>
        <p className='items-center leading-[150%] flex gap-2 '>
          Price / 1 hour:{' '}
          <span className='text-[#38cd3e]'>{price_per_hour}$</span>
        </p>
      </div>
      <button
        className='absolute right-6'
        type='button'
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
      >
        <svg
          width='26'
          height='26'
          className={` stroke-[2px]  ${
            favorites
              ? 'stroke-[#103931] fill-[#103931]'
              : 'stroke-[#11101C] fill-transparent'
          }`}
        >
          <use href='/icons.svg#heart'></use>
        </svg>
      </button>
    </>
  );
}
