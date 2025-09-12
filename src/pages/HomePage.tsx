
import { Link } from 'react-router-dom';
import Container from '../components/Container';

export interface HomePageProps {
}

export default function HomePage({ }: HomePageProps) {
  return (
    <div className='xls:m-8 m-4 min-w-[288px] w-[80vw] xls:w-[1376px] bg-[#103931] bg-[url(./assets/hero.png)] retina:bg-[url(./assets/hero@2x.png)]  bg-no-repeat lg:bg-right bg-top xl:bg-contain bg-cover rounded-[30px] '>
      <Container>
        <div className='lg:h-[736px] h-[90vh] flex flex-col gap-2 xls:justify-center justify-end relative xls:pt-[88px]'>
          <div className='xls:w-[517px] md:w-[280px] w-full text-[rgb(251,251,251)] mb-[200px] xls:m-0'>
            <h1 className='font-medium xls:text-[70px] md:text-[48px] text-[38px] leading-[100%] tracking-[-0.03em] mb-7'>
              Make Life Easier for the Family:
            </h1>
            <p className='xls:text-[28px] md:text-2xl text-lg leading-[107%] tracking-[-0.02em] xls:mb-16 mb-8'>
              Find Babysitters Online for All Occasions
            </p>
            <Link
              className='group relative border w-[230px] h-[60px] font-medium text-xl leading-[120%] tracking-[-0.01em] text-current flex  items-center justify-center rounded-[30px] border-solid border-[rgba(251,251,251,0.4)] '
              to='/nannies'
            >
              <span className='group relative'>
                Get started
                <svg
                  width='15'
                  height='17'
                  className='group-hover:opacity-0 absolute top-[50%] right-[-33px] translate-y-[-50%] transition'
                >
                  <use href='/icons.svg#arrow-top-right'></use>
                </svg>
                <svg
                  width='20'
                  height='16'
                  className='group-hover:opacity-100 absolute top-[50%] right-[-38px] translate-y-[-50%] opacity-0 transition'
                >
                  <use href='/icons.svg#arrow-right'></use>
                </svg>
              </span>
            </Link>
          </div>
          <div className='absolute bg-[#fbfbfb] rounded-[20px] xls:p-8 p-4 bottom-[50px] xls:right-[-46px] right-0 flex items-center gap-4'>
            <div className='w-[54px] h-[54px] flex justify-center items-center bg-[#103931] rounded-[13px]'>
              <svg width='20' height='16'>
                <use href='/icons.svg#check'></use>
              </svg>
            </div>
            <p className='text-base text-[rgba(17,16,28,0.5)] flex flex-col gap-[6px]'>
              Experienced nannies
              <span className='font-bold xls:text-2xl text-lg text-[#11101c]'>
                15,000
              </span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
