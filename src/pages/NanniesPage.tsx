import { useEffect, useState } from 'react';
import Container from '../components/Container';
import NannieCard from '../components/NannieCard';
import Filters, { options } from '../components/Filters';
import { SingleValue } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCursor,
  selectHasMore,
  selectItems,
  selectLoading,
  selectModalIsOpen,
} from '../redux/selectors';
import { AppDispatch } from '../redux/store';
import { fetchData, loadMore } from '../redux/nanniesOperation';
import LoadMoreBtn from '../components/LoadMoreBtn';
import ScrollTopBtn from '../components/ScrollTopBtn';
import { Cursor } from '../utils/newFilters';

export interface NanniesPageProps {}

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export type OptionType = {
  value: string;
  label: string;
};

export interface NannieCardInterface {
  id: string;
  name: string;
  avatar_url: string;
  birthday: string;
  experience: string;
  reviews: Review[];
  education: string;
  kids_age: string;
  price_per_hour: number;
  location: string;
  about: string;
  characters: string[];
  rating: number;
}

export type Params = {
  filter: string;
  cursor: Cursor;
  pageSize: number;
  favorites?: string[];
};

export default function NanniesPage({}: NanniesPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectItems);
  const cursor = useSelector(selectCursor);
  const hasMore = useSelector(selectHasMore);
  const loading = useSelector(selectLoading);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    options[0],
  );
  const modalIsOpen = useSelector(selectModalIsOpen);

  const handleChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
  };


  async function loadNext() {
    if (!cursor) return;
    dispatch(
      loadMore({
        filter: selectedOption?.value || 'all',
        cursor,
        pageSize: 3,
      }))
  }


  useEffect(() => {
 dispatch(
   fetchData({
     filter: selectedOption?.value || 'all',
     cursor: null,
     pageSize: 3,
   }),
 );
  }, [selectedOption]);

  return (
    <div
      className={`min-w-[320px] w-[100vw] ${
        modalIsOpen ? 'overflow-clip mt-0 h-[100vh]' : 'mt-[88px]'
      }`}
    >
      <Container>
        <Filters handleChange={handleChange} selected={selectedOption} />
        {items && <ul className='flex flex-col gap-8 pb-16 pt-8'>
          {items.map((item: NannieCardInterface) => (
            <li
              key={item.id}
              className='bg-[#fbfbfb] sm:p-6 p-4 rounded-3xl flex xls:flex-row flex-col gap-6 relative'
            >
              <NannieCard item={item} />
            </li>
          ))}
        </ul>}
        {!loading && hasMore && <LoadMoreBtn onClick={loadNext} />}
        <ScrollTopBtn />
      </Container>
    </div>
  );
}
