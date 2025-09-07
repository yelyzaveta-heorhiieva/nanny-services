
import { Link } from 'react-router-dom';
import Container from '../components/Container';

export interface HomePageProps {
}

export default function HomePage({ }: HomePageProps) {
  return (
    <>
      <div className='m-8 bg-[#103931] bg-[url(./assets/hero.png)] bg-no-repeat bg-right bg-contain rounded-[30px]'>
        <Container>
          <div className='h-[736px] flex flex-col justify-center relative pt-[88px]'>
            <div className='w-[517px] text-[#fbfbfb]'>
              <h1 className='font-medium text-[70px] leading-[100%] tracking-[-0.03em] mb-7'>
                Make Life Easier for the Family:
              </h1>
              <p className='text-[28px] leading-[107%] tracking-[-0.02em] mb-16'>
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
            <div className='absolute bg-[#fbfbfb] rounded-[20px] p-8 bottom-[50px] right-[50px] flex items-center gap-4'>
              <div className='w-[54px] h-[54px] flex justify-center items-center bg-[#103931] rounded-[13px]'>
                <svg width='20' height='16'>
                  <use href='/icons.svg#check'></use>
                </svg>
              </div>
              <p className='text-base text-[rgba(17,16,28,0.5)] flex flex-col gap-[6px]'>
                Experienced nannies
                <span className='font-bold text-2xl text-[#11101c]'>
                  15,000
                </span>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
