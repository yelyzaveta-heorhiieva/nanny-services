import Container from '../components/Container';
import { NannieCardInterface, OptionType } from './NanniesPage';
import NannieCard from '../components/NannieCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentFavorites,
  selectFavorites,
  selectLoading,
} from '../redux/selectors';
import Filters, { options } from '../components/Filters';
import { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import { AppDispatch } from '../redux/store';
import { optionSwitch } from '../utils/optionSwitch';
import { fetchData } from '../redux/nanniesOperation';
import LoadMoreBtn from '../components/LoadMoreBtn';
import { loadMoreFavorites } from '../redux/nanniesSlice';

export interface FavoritesPageProps {}

export default function FavoritesPage({}: FavoritesPageProps) {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);
  const currentFavorites = useSelector(selectCurrentFavorites);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    options[0],
  );

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
    <div className='mt-[88px]'>
      <Container>
        {currentFavorites.length > 0 ? (
          <>
            <Filters handleChange={handleChange} selected={selectedOption} />
            <ul className='flex flex-col gap-8 pb-16 pt-8'>
              {currentFavorites?.map((item: NannieCardInterface) => (
                <li
                  key={item.id}
                  className='bg-[#fbfbfb] sm:p-6 p-4 rounded-3xl flex xls:flex-row flex-col gap-6 relative'
                >
                  <NannieCard item={item} />
                </li>
              ))}
            </ul>
            {!loading && currentFavorites.length < favorites.length && (
              <LoadMoreBtn
                onClick={() => dispatch(loadMoreFavorites(favorites))}
              />
            )}
          </>
        ) : (
          <p className='text-[26px] leading-[125%] font-bold text-center top-1/2 left-1/2 absolute translate-x-[-50%]  translate-y-[-50%]'>
            You have not favorites nannies yet. You can add some from nannies
            list.
          </p>
        )}
      </Container>
    </div>
  );
}
