import { Form, Formik } from 'formik';
import FormField from './FormField';
import { useState } from 'react';
import Select, { SingleValue, components } from 'react-select';

export interface AppointmentFormProps {}

type Option = {
  value: string;
  label: string;
};

function generateTimes(stepMinutes: number, start = 0, end = 24) {
  const result: Option[] = [];
  for (let h = start; h < end; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      const t = `${hh}:${mm}`;
        result.push({ value: t, label: t });
    }
  }
  return result;
}

const classNames = {
  container: () =>
    'flex items-center justify-center w-full h-[52px]  border rounded-xl border-solid border-[rgba(17,16,28,0.1)] ',
  control: () => 'w-full border-none rounded-xl bg-transparent py-4 px-[18px] ',
  input: () => 'font-normal leading-[125%] text-[#11101c]',
  menu: () =>
    'max-w-[150px] h-[180px] shadow-[0_20px_69px_0_rgba(0,0,0,0.07)] rounded-xl bg-white py-[14px] px-[18px] mt-2 right-0',
  menuList: () => 'flex flex-col gap-2 ',
  option: (state: any) =>
    `font-medium text-lg leading-[125%] font-helvetica text-center
      ${
        state.isSelected
          ? 'text-[#11101c]'
          : 'text-[rgba(17,16,28,0.3)] hover:text-[#11101c]'
      } `,
  placeholder: () => 'font-normal text-base leading-[125%] text-[#11101c]',
  singleValue: () =>
    'font-medium text-lg leading-[111%] text-[#fbfbfb] font-helvetica',
  dropdownIndicator: () => 'text-[#fbfbfb]',
};

const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <svg
      width='20'
      height='20'
      className='stroke-[1.5] stroke-[#11101C] fill-transparent'
    >
      <use href='/icons.svg#clock'></use>
    </svg>
  </components.DropdownIndicator>
);

const CustomMenuList = (props: any) => (
  <components.MenuList {...props}>
    <div className='font-medium leading-[150%] text-[#11101c] mb-4'>
      Meeting time
    </div>
    {props.children}
  </components.MenuList>
);

const CustomOption = (props: any) => {
  const [hours, minutes] = props.data.label.split(':');
  return (
    <components.Option {...props}>
      <span>{hours}</span> <span className='px-1'>:</span>{' '}
      <span>{minutes}</span>
    </components.Option>
  );
};

export default function AppointmentForm({}: AppointmentFormProps) {
  const [selected, setSelected] = useState<Option | null>(null);
  const options = generateTimes(30, 9, 11); // з 09:00 до 18:00
  console.log(options);

  const initialValues = {
    address: '',
    number: '',
    child_age: '',
    time: '',
    email: '',
    parent_name: '',
    comment: '',
  };

  const handleSubmit = () => {};
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      //   validationSchema={validationSchema}
    >
      <Form className='flex flex-col gap-[18px]'>
        <div className='grid grid-cols-2 gap-x-2 gap-y-4'>
          <FormField name='address' type='text' placeholder='Address' />
          <FormField name='number' type='tel' placeholder='+380' />
          <FormField name='child_age' type='text' placeholder="Child's age" />
          <Select
            options={options}
            value={selected}
            onChange={setSelected}
            placeholder='00:00'
            classNames={classNames}
            components={{
              DropdownIndicator,
              MenuList: CustomMenuList,
              Option: CustomOption,
            }}
            unstyled
          />
        </div>
        <FormField name='email' type='email' placeholder='Email' />
        <FormField
          name='parent_name'
          type='text'
          placeholder="Father's or mother's name"
        />
        <FormField name='comment' type='text' placeholder='Comment' />
      </Form>
    </Formik>
  );
}
