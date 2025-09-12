import { NannieCardInterface, Review } from '../pages/NanniesPage';
import ReviewItem from './ReviewItem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { openPopUp } from '../redux/modalSlice';
import { selectPopUpIsOpen } from '../redux/selectors';
import Modal from './Modal';
import PopUp from './PopUp';
import { useMediaQuery } from 'react-responsive';

export interface NannieCardMoreProps {
  item: NannieCardInterface;
}

export default function NannieCardMore({ item }: NannieCardMoreProps) {
  const dispatch = useDispatch<AppDispatch>();
  const popUpIsOpen = useSelector(selectPopUpIsOpen);
  const isMediumScreen = useMediaQuery({ query: '(min-width: 480px)' });


  const { reviews } = item;

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
        <Modal
          classes={
            isMediumScreen
              ? 'max-w-[599px] min-w-[288px]'
              : 'w-[288px] max-h-[860px] h-[80vh]'
          }
        >
          <PopUp item={item} />
        </Modal>
      )}
    </div>
  );
}
