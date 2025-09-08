import React, { useEffect, useRef, useState } from 'react';
import Container from '../components/Container';
import { get } from 'firebase/database';
import NannieCard from '../components/NannieCard';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import Filters, { options } from '../components/Filters';
import { SingleValue } from 'react-select';
import { optionSwitch } from '../utils/optionSwitch';
import { queryParams } from '../utils/queryParams';

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

export default function NanniesPage({}: NanniesPageProps) {
  const [nannies, setNannies] = useState<NannieCardInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    options[0],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentNannies, setCurrentNannies] = useState<NannieCardInterface[]>(
    [],
  );
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const PAGE_SIZE = 2;

  const handleChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
  };

  const fetchData = async (params: Params) => {
    try {
      setIsFirstLoad(true);
      setLoading(true);
      const q = queryParams(params);
      const snapshot = await get(q);
      if (snapshot.exists()) {
        const data: NannieCardInterface[] = [];
        snapshot.forEach((childSnap) => {
          data.push({
            ...(childSnap.val() as NannieCardInterface),
          });
        });

        let sorted = params.order === 'inc' ? data : [...data].reverse();

        setNannies(sorted);
        setCurrentNannies(sorted.slice(0, PAGE_SIZE));
        setCurrentIndex(PAGE_SIZE);
      }
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = nannies.slice(currentIndex, currentIndex + PAGE_SIZE);
    setCurrentNannies((prev) => [...prev, ...nextPage]);
    setCurrentIndex((prev) => prev + PAGE_SIZE);
    setIsFirstLoad(false);
  };

  useEffect(() => {
    setNannies([]);
    const opt = optionSwitch(
      selectedOption || { value: 'all', label: 'Show all' },
    );
    fetchData(opt);
  }, [selectedOption]);

  useEffect(() => {
    if (!isFirstLoad) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [isFirstLoad, currentNannies]);

  console.log(currentNannies);
  

  return (
    <div className='mt-[88px]'>
      <Container>
        <Filters handleChange={handleChange} selected={selectedOption} />
        <ul className='flex flex-col gap-8 pb-16 pt-8'>
          {currentNannies.map((item: NannieCardInterface) => (
            <li
              key={item.id}
              className='bg-[#fbfbfb] p-6 rounded-3xl flex gap-6 relative'
            >
              <NannieCard item={item} />
            </li>
          ))}
        </ul>
        {!loading && currentNannies.length < nannies.length && (
          <button
            onClick={loadMore}
            disabled={loading}
            type='button'
            className=' w-[159px] h-12 rounded-[30px] bg-[#103931] font-medium leading-[125%] tracking-[-0.01em] 
            text-[#fbfbfb] mb-[100px] mx-auto'
          >
            Load more
          </button>
        )}
        {loading && <Loader />}
      </Container>
    </div>
  );
}
