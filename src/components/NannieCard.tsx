import {  useState } from 'react';
import { NannieCardInterface } from '../pages/NanniesPage';
import NannieFeature from './NannieFeature';
import NanniePoint from './NanniePoint';
import { getAge } from '../utils/getAge';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites } from '../redux/selectors';
import NannieCardMore from './NannieCardMore';
import { AppDispatch } from '../redux/store';
import { toggleFavorite } from '../redux/nanniesOperation';

export interface NannieCardProps {
  item: NannieCardInterface;
}

export default function NannieCard({ item }: NannieCardProps) {
  const [readMore, setReadMore] = useState<boolean>(false);

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

  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = async () => {
    await dispatch(toggleFavorite(id));
  };

  return (
    <>
      <div className='rounded-[30px] border-2 border-solid border-[rgba(240,63,59,0.2)] p-3 min-w-[120px] max-w-[120px] max-h-[120px] relative'>
        <img
          src={avatar_url}
          alt={name}
          width='24'
          height='24'
          className='w-24 max-h-24 rounded-[15px]'
        />
        <svg width='14' height='14' className='absolute top-[9px] right-[14px]'>
          <use href='/icons.svg#dot'></use>
        </svg>
      </div>
      <div className='xls:w-full'>
        <p className='font-medium leading-[150%] text-[#8a8a89] mb-2'>Nanny</p>
        <h3 className='font-medium text-2xl leading-[100%] text-[#11101c] mb-6'>
          {name}
        </h3>
        <ul className='flex gap-2 flex-wrap mb-6'>
          <NannieFeature feature='Age: ' value={getAge(birthday)} />
          <NannieFeature feature='Experience: ' value={experience} />
          <NannieFeature feature='Kids Age: ' value={kids_age} />
          <NannieFeature
            feature='Characters: '
            value={characters?.join(', ')}
          />
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
      <div className='absolute sm:right-[98px] sm:top-6 top-[60px] max-w-[110px] sm:max-w-full right-0 flex lg:flex-row flex-col sm:gap-4 lg:gap-8 gap-0 font-medium text-[#11101c]'>
        <NanniePoint
          icon='map-pin'
          iconClass='stroke-[1.5] stroke-[#11101C] fill-transparent'
        >
          {location}
        </NanniePoint>
        <NanniePoint icon='star' iconClass=''>
          Rating: {rating}
        </NanniePoint>
        <p className='items-center leading-[150%] flex sm:gap-2 gap-1 sm:text-base text-xs'>
          Price / 1 hour:{' '}
          <span className='text-[#38cd3e]'>{price_per_hour}$</span>
        </p>
      </div>
      <button
        className='absolute right-6'
        type='button'
        onClick={() => handleClick()}
      >
        <svg
          width='26'
          height='26'
          className={` stroke-[2px]  ${
            favorites?.some((i) => i.id === id)
              ? 'stroke-[var(--main)] fill-[var(--main)]'
              : 'stroke-[#11101C] fill-transparent'
          }`}
        >
          <use href='/icons.svg#heart'></use>
        </svg>
      </button>
    </>
  );
}
