import { ErrorMessage, Field } from 'formik';
import  { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export interface PasswordFieldProps {
  name: string;
}

export default function PasswordField({ name }: PasswordFieldProps) {
  const [show, setShow] = useState(false);
  const isBigScreen = useMediaQuery({
    query: '(min-width: 1280)',
  });

  return (
    <label className='block'>
      <div className='relative'>
        <Field
          type={show ? 'text' : 'password'}
          placeholder='Password'
          name={name}
          className='outline-none border w-full h-[52px] pl-[18px] pr-[18px] py-4 rounded-xl
          border-solid border-[rgba(17,16,28,0.1)] placeholder-[#11101c] bg-transparent'
        />
        <button
          type='button'
          className='absolute top-[50%] right-4 translate-y-[-50%] cursor-pointer'
          {...(!isBigScreen
            ? { onClick: () => setShow((prev) => !prev) }
            : {
                onMouseDownCapture: () => setShow(true),
                onMouseUpCapture: () => setShow(false),
              })}
        >
          <svg width='20' height='20' className='stroke-[#11101C] fill-none '>
            <use href={`/icons.svg#${show ? 'eye' : 'eye-off'}`}></use>
          </svg>
        </button>
      </div>

      <ErrorMessage
        name={name}
        component='div'
        className='mt-1 text-sm text-red-500'
      />
    </label>
  );
}
