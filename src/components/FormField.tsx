import { ErrorMessage, Field } from 'formik';

export interface FormFieldProps {
    type: string;
    placeholder: string;
    name: string;
}

export default function FormField({type, placeholder, name}: FormFieldProps) {
  return (
    <label className='mb-[18px] block'>
      <Field
        type={type}
        placeholder={placeholder}
        name={name}
        className='outline-none  border w-full h-[52px] pl-[18px] pr-[18px] py-4 rounded-xl border-solid border-[rgba(17,16,28,0.1)] placeholder-[#11101c]'
      />
      <ErrorMessage
        name={name}
        component='div'
        className='mt-1 text-sm text-red-500'
      />
    </label>
  );
};
