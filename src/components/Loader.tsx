import { Circles } from 'react-loader-spinner';

export interface LoaderProps {}

export default function Loader({}: LoaderProps) {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-[rgba(11,11,11,0.2)] z-[1010]'>
        <Circles
          height='60'
          width='60'
          color='var(--main)'
          ariaLabel='circles-loading'
          wrapperStyle={{}}
          wrapperClass='items-center w-full h-full justify-center'
          visible={true}
        />
    </div>
  );
}
