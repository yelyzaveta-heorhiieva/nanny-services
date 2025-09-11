
import Navigation from './Navigation';
import UserActions from './UserActions';

export interface MobileMenuProps {
    onClick: () => void;
}

export default function MobileMenu({onClick}: MobileMenuProps) {
  return (
    <div className='flex flex-col items-center text-[#fbfbfb]'>
      <button type='button' onClick={onClick}>
        <svg
          width='32'
          height='32'
          className='stroke-[#fbfbfb] stroke-[2.5] absolute top-8 right-8 '
        >
          <use href='/icons.svg#close'></use>
        </svg>
      </button>
      <Navigation onClick={onClick} />
      <UserActions onClick={onClick} />
    </div>
  );
};
