

export interface ScrollTopBtnProps {}

export default function ScrollTopBtn({ }: ScrollTopBtnProps) {
    const handleClick = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    }

  return (
    <button
      type='button'
      className='bg-[#103931] rounded-full w-12 h-12 flex items-center justify-center absolute md:bottom-[80px] bottom-[40px] right-10'
      onClick={handleClick}
    >
      <svg width='26' height='26' className='fill-white'>
        <use href='/icons.svg#arrow-up'></use>
      </svg>
    </button>
  );
};
