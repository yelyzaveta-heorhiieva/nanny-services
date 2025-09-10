import { ErrorMessage, Field } from 'formik';

export interface FormFieldProps {
  type: string;
  placeholder: string;
  name: string;
  as?: string;
}

export default function FormField({
  type,
  placeholder,
  name,
  as
}: FormFieldProps) {
  return (
    <label>
      <Field
        as={as}
        type={type}
        placeholder={placeholder}
        name={name}
        className={`outline-none  border w-full h-[52px] px-[18px] py-4 rounded-xl 
        border-solid border-[rgba(17,16,28,0.1)] placeholder-[#11101c] bg-transparent
        ${as === 'textarea' && 'resize-none overflow-hidden h-[116px]'}`}
      />
      <ErrorMessage
        name={name}
        component='div'
        className='mt-1 text-sm text-red-500'
      />
    </label>
  );
}
