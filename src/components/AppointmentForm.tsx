import { Form, Formik, FormikValues } from 'formik';
import FormField from './FormField';
import Select, { components } from 'react-select';
import * as Yup from 'yup';
import { generateTimes } from '../utils/generateTimes';
import { push, ref, update } from 'firebase/database';
import { db } from '../../firebase';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AppDispatch } from '../redux/store';
import { closeModal } from '../redux/modalSlice';
import { NannieCardInterface } from '../pages/NanniesPage';

export interface AppointmentFormProps {
  item: NannieCardInterface
}

const classNames = {
  container: () =>
    'flex items-center justify-center w-full h-[52px]  border rounded-xl border-solid border-[rgba(17,16,28,0.1)] ',
  control: () => 'w-full border-none rounded-xl bg-transparent py-4 px-[18px] ',
  input: () => 'font-normal leading-[125%] text-[#11101c]',
  menu: () =>
    'max-w-[150px] h-[180px] shadow-[0_20px_69px_0_rgba(0,0,0,0.07)] rounded-xl bg-white py-[14px] px-[18px] mt-2 right-0',
  menuList: () => 'flex flex-col gap-1 ',
  option: (state: any) =>
    `font-medium text-base leading-[125%] font-helvetica text-center
      ${
        state.isSelected
          ? 'text-[#11101c]'
          : 'text-[rgba(17,16,28,0.3)] hover:text-[#11101c]'
      } `,
  placeholder: () => 'font-normal text-base leading-[125%] text-[#11101c]',
  singleValue: () =>
    'font-medium text-lg leading-[111%] text-[#11101c] font-helvetica',
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
    <div className='font-medium leading-[150%] text-[#11101c] lg:mb-4 mb-2'>
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

export default function AppointmentForm({item}: AppointmentFormProps) {
  const options = generateTimes(30, 9, 11);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    address: '',
    number: '',
    child_age: '',
    time: '',
    email: '',
    parent_name: '',
    comment: '',
  };

  const handleSubmit = async (values: FormikValues) => {
    const appointmentsRef = ref(db, 'appointments');
    await push(appointmentsRef, {nannies_id: item.id, ... values })
      .then(() => {
        dispatch(closeModal())
        toast.success('Appointment saved!');
      })
      .catch((err) => toast.error(err.message));
  };

  const validationSchema = Yup.object().shape({
    address: Yup.string().min(2, 'Too short!').required('Required!'),
    number: Yup.string()
      .required('Required!')
      .matches(/^\+380\d{9}$/, 'Must be in format +380XXXXXXXXX'),
    child_age: Yup.string().required('Required!'),
    time: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid email').required('Required!'),
    parent_name: Yup.string().min(2, 'Too short!').required('Required!'),
    comment: Yup.string().min(2, 'Too short!').required('Required!'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({
        setFieldValue,
        setFieldTouched,
        values,
        isValid,
        dirty,
        errors,
        touched,
      }) => {
        return (
          <Form className='flex flex-col gap-[18px]'>
            <div className='grid grid-cols-2 gap-x-2 gap-y-4'>
              <FormField name='address' type='text' placeholder='Address' />
              <FormField name='number' type='tel' placeholder='+380' />
              <FormField
                name='child_age'
                type='text'
                placeholder="Child's age"
              />
              <label>
                <Select
                  options={options}
                  value={options.find((option) => option.value === values.time)}
                  onChange={(option) => setFieldValue('time', option?.value)}
                  placeholder='00:00'
                  onBlur={() => setFieldTouched('time', true)}
                  isSearchable={false}
                  classNames={classNames}
                  components={{
                    DropdownIndicator,
                    MenuList: CustomMenuList,
                    Option: CustomOption,
                  }}
                  unstyled
                />
                {touched.time && errors.time && (
                  <div className='mt-1 text-sm text-red-500'>{errors.time}</div>
                )}
              </label>
            </div>
            <FormField name='email' type='email' placeholder='Email' />
            <FormField
              name='parent_name'
              type='text'
              placeholder="Father's or mother's name"
            />
            <FormField
              as='textarea'
              name='comment'
              type='text'
              placeholder='Comment'
            />
            <button
              type='submit'
              disabled={!isValid || !dirty}
              className={`w-full h-[52px] flex items-center justify-center bg-[#103931] rounded-[30px] font-medium leading-[125%] 
          tracking-[-0.01em] text-[#fbfbfb] ${
            (!dirty || !isValid) && 'bg-slate-600'
          }`}
            >
              Send
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
