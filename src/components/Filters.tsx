import Select, { SingleValue } from 'react-select';
import { OptionType } from '../pages/NanniesPage';
import { useSelector } from 'react-redux';
import { selectModalIsOpen } from '../redux/selectors';

export const options = [
  { value: 'alphabetAsc', label: 'A to Z' },
  { value: 'alphabetDesc', label: 'Z to A' },
  { value: 'priceLess17', label: 'Less than 17$' },
  { value: 'priceMore17', label: 'Greater than 17$' },
  { value: 'popularityDesc', label: 'Popular' },
  { value: 'popularityAsc', label: 'Not popular' },
  { value: 'all', label: 'Show all' },
];

export interface FiltersProps {
  handleChange: (option: SingleValue<OptionType>) => void;
  selected: OptionType | null;
}

const classNames = {
  container: () =>
    'flex items-center justify-center w-[226px] h-12  rounded-[14px] bg-[var(--main)] border-none mt-2 ',
  control: () =>
    'w-full border-none rounded-[14px] bg-transparent py-[14px] px-[18px] ',
  input: () =>
    'font-medium text-lg leading-[111%] text-[#fbfbfb] font-helvetica',
  valueContainer: () => '',
  menu: () =>
    'font-normal text-lg leading-[111%] font-helvetica w-[226px] h-[244px] shadow-[0_20px_69px_0_rgba(0,0,0,0.07)] bg-white rounded-[14px] py-[14px] px-[18px] mt-2',
  menuList: () => 'flex flex-col gap-3',
  option: (state: any) =>
    `font-normal text-lg leading-[111%] font-helvetica
      ${
        state.isSelected
          ? 'text-[#11101c]'
          : 'text-[rgba(17,16,28,0.3)] hover:text-[#11101c]'
      } `,
  placeholder: () =>
    'font-medium text-lg leading-[111%] text-[#fbfbfb] font-helvetica',
  singleValue: () =>
    'font-medium text-lg leading-[111%] text-[#fbfbfb] font-helvetica',
  dropdownIndicator: () => 'text-[#fbfbfb]',
};

export default function Filters({ handleChange, selected }: FiltersProps) {
  const modalIsOpen = useSelector(selectModalIsOpen);
  return (
    <div className={`${modalIsOpen ? 'mt-0' : 'mt-[152px]'}`}>
      <label className='font-medium text-sm leading-[129%] text-[#8a8a89]'>
        Filters
        <Select
          options={options}
          onChange={handleChange}
          unstyled
          value={selected}
          placeholder='A to Z'
          isSearchable={false}
          classNames={classNames}
        />
      </label>
    </div>
  );
}
