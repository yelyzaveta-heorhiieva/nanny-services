
import { Review } from '../pages/NanniesPage';


export default function ReviewItem({reviewer, rating, comment}: Review) {
  return (
    <>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-11 h-11 bg-[rgba(16,57,49,0.2)] rounded-[100px] flex justify-center items-center font-medium text-xl leading-[100%] text-[var(--main)]'>
          {reviewer.slice(0, 1)}
        </div>
        <div>
          <h4 className='font-medium leading-[125%] text-[#11101c] mb-1'>
            {reviewer}
          </h4>
          <p className='flex gap-2 font-medium text-sm leading-[129%] text-[#11101c]'>
            <svg width='16' height='16'>
              <use href='/icons.svg#star'></use>
            </svg>
            {rating.toFixed(1)}
          </p>
        </div>
      </div>
      <p className='font-normal leading-[125%] text-[rgba(17,16,28,0.5)]'>
        {comment}
      </p>
    </>
  );
};
