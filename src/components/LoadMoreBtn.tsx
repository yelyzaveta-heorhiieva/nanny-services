
import { useSelector } from 'react-redux';
import { selectLoading } from '../redux/selectors';


export interface LoadMoreBtnProps {
  onClick: () => void;
}

export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  const loading = useSelector(selectLoading);

  return (
    <button
      onClick={onClick ?? undefined}
      disabled={loading}
      type='button'
      className=' w-[159px] h-12 rounded-[30px] bg-[var(--main)] font-medium leading-[125%] tracking-[-0.01em] 
            text-[#fbfbfb] mb-[100px] mx-auto'
    >
      Load more
    </button>
  );
}
