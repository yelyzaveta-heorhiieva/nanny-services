import { useEffect, useState } from 'react';
import Container from '../components/Container';
import NannieCard from '../components/NannieCard';
import Loader from '../components/Loader';
import Filters, { options } from '../components/Filters';
import { SingleValue } from 'react-select';
import { optionSwitch } from '../utils/optionSwitch';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllNannies,
  selectCurrentNannies,

  selectLoading,
  selectModalIsOpen,
} from '../redux/selectors';
import { AppDispatch } from '../redux/store';
import { fetchData } from '../redux/nanniesOperation';
import { loadMore } from '../redux/nanniesSlice';
import LoadMoreBtn from '../components/LoadMoreBtn';

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
  orderBy: string;
  order: string;
  startAt?: number;
  endAt?: number;
};

export default function NanniesPage({ }: NanniesPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const nannies = useSelector(selectAllNannies);
  const currentNannies = useSelector(selectCurrentNannies);
  const loading = useSelector(selectLoading);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    options[0],
  );
   const modalIsOpen = useSelector(selectModalIsOpen);

  const handleChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const opt = optionSwitch(
      selectedOption || { value: 'all', label: 'Show all' },
    );
    dispatch(fetchData(opt));
  }, [selectedOption]);

  return (
    <div
      className={`min-w-[320px] w-[100vw] ${
        modalIsOpen
          ? 'overflow-clip mt-0 h-[100vh]'
          : 'mt-[88px]'
      }`}
    >
      <Container>
        <Filters handleChange={handleChange} selected={selectedOption} />
        <ul className='flex flex-col gap-8 pb-16 pt-8'>
          {
            currentNannies.map((item: NannieCardInterface) => (
              <li
                key={item.id}
                className='bg-[#fbfbfb] sm:p-6 p-4 rounded-3xl flex xls:flex-row flex-col gap-6 relative'
              >
                <NannieCard item={item} />
              </li>
            ))}
        </ul>
        {!loading && currentNannies.length < nannies.length && (
          <LoadMoreBtn onClick={() => dispatch(loadMore(nannies))} />
        )}
      </Container>
    </div>
  );
}
