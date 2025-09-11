import AppointmentForm from './AppointmentForm';
import { NannieCardInterface } from '../pages/NanniesPage';

export interface PopUpProps {
  item: NannieCardInterface;
}

export default function PopUp({ item }: PopUpProps) {
  const { avatar_url, name } = item;
  return (
    <>
      <h2 className='font-medium lg:text-[40px] text-2xl max-w-[180px] md:max-w-none leading-[120%] tracking-[-0.02em] text-[#11101c] mb-5'>
        Make an appointment with a babysitter
      </h2>
      <p className='font-normal lg:text-base text-sm leading-[125%] text-[rgba(17,16,28,0.5)] mb-10'>
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill out the form below so
        we can match you with the perfect care partner.
      </p>
      <div className='flex gap-[14px] items-center mb-10'>
        <img
          src={avatar_url}
          alt={name}
          className='w-11 max-h-11 rounded-[15px]'
        />
        <div>
          <p className='font-medium text-xs leading-[133%] text-[#8a8a89] mb-1'>
            Your nanny
          </p>
          <h3 className='font-medium leading-[150%] text-[#11101c]'>{name}</h3>
        </div>
      </div>
      <AppointmentForm item={item} />
    </>
  );
}
