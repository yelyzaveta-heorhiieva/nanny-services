
import Navigation from './Navigation';
import UserActions from './UserActions';

export interface MobileMenuProps {
  onClick: () => void;
}

export default function MobileMenu({ onClick }: MobileMenuProps) {

  
  return (
    <div className='p-10 h-[100vh] flex flex-col justify-around items-center text-[#fbfbfb]'>
      <button
        type='button'
        onClick={onClick}
        className='w-8 h-8 flex items-center justify-center absolute top-8 right-8'
      >
        <svg width='32' height='32' className='stroke-[#fbfbfb] stroke-[2.5]'>
          <use href='/icons.svg#close'></use>
        </svg>
      </button>
      <Navigation onClick={onClick} />
      <UserActions onClick={onClick} />
    </div>
  );
}
