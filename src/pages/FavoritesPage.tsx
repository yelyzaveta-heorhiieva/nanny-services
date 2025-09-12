import Container from '../components/Container';
import { NannieCardInterface, OptionType } from './NanniesPage';
import NannieCard from '../components/NannieCard';
import { useSelector } from 'react-redux';
import {
  selectFavorites,
  selectModalIsOpen,
} from '../redux/selectors';
import Filters, { options } from '../components/Filters';
import { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import LoadMoreBtn from '../components/LoadMoreBtn';
import ScrollTopBtn from '../components/ScrollTopBtn';
import { optionSwitch } from '../utils/optionSwitch';

export interface FavoritesPageProps {}

export default function FavoritesPage({}: FavoritesPageProps) {
  const favorites = useSelector(selectFavorites);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    options[0],
  );
  const [filteredFavorites, setFilteredFavorites] = useState<
    NannieCardInterface[]
  >([]);
  const modalIsOpen = useSelector(selectModalIsOpen);

  const handleChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
  };
  const [visibleCount, setVisibleCount] = useState(3);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  useEffect(() => {
    setVisibleCount(3);
    const result = optionSwitch(selectedOption, favorites);
    setFilteredFavorites(result);
  }, [selectedOption, favorites]);


  return (
    <div
      className={`min-w-[320px] w-full ${
        modalIsOpen ? 'overflow-clip mt-0 h-[100vh]' : 'mt-[88px]'
      }`}
    >
      <Container>
        {favorites.length > 0 ? (
          <>
            <Filters handleChange={handleChange} selected={selectedOption} />
            <ul className='flex flex-col gap-8 pb-16 pt-8'>
              {filteredFavorites
                ?.slice(0, visibleCount)
                .map((item: NannieCardInterface) => (
                  <li
                    key={item.id}
                    className='bg-[#fbfbfb] sm:p-6 p-4 rounded-3xl flex xls:flex-row flex-col gap-6 relative'
                  >
                    <NannieCard item={item} />
                  </li>
                ))}
            </ul>
            {visibleCount < filteredFavorites.length && (
              <LoadMoreBtn onClick={loadMore} />
            )}
          </>
        ) : (
          <p className='text-[26px] leading-[125%] font-bold text-center top-1/2 left-1/2 absolute translate-x-[-50%]  translate-y-[-50%]'>
            You have not favorites nannies yet. You can add some from nannies
            list.
          </p>
        )}
        <ScrollTopBtn />
      </Container>
    </div>
  );
}
