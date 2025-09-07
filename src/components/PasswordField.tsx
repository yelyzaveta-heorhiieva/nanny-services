import { ErrorMessage, Field } from 'formik';
import React, { useState } from 'react';

export interface PasswordFieldProps {
    name: string;
}

export default function PasswordField({name }: PasswordFieldProps) {
  const [show, setShow] = useState(false);
    
  return (
    <label className='relative block'>
      <Field
        type={show ? 'text' : 'password'}
        placeholder='Password'
        name={name}
        className='outline-none border w-full h-[52px] pl-[18px] pr-[18px] py-4 rounded-xl border-solid border-[rgba(17,16,28,0.1)] placeholder-[#11101c]'
      />
      <ErrorMessage
        name={name}
        component='div'
        className='mt-1 text-sm text-red-500'
      />
      <svg
        onMouseDownCapture={() => setShow(true)}
        onMouseUpCapture={() => setShow(false)}
        width='20'
        height='20'
        className='stroke-[#11101C] fill-none absolute top-2/4 right-4 translate-y-[-50%] cursor-pointer'
      >
        <use href={`/icons.svg#${show ? 'eye' : 'eye-off'}`}></use>
      </svg>
    </label>
  );
};
