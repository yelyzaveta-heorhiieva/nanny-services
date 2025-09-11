import { Form, Formik } from 'formik';
import { logIn, register } from '../redux/authOperations';
import { closeModal } from '../redux/modalSlice';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch} from '../redux/store';
import {
  selectLoginFormIsOpen,
  selectRegisterFormIsOpen,
} from '../redux/selectors';
import FormField from './FormField';
import PasswordField from './PasswordField';
import AuthHeader from './AuthHeader';

export interface AuthFormProps {}

export interface FormValues {
  name?: string;
  email: string;
  password: string;
}

export default function AuthForm({}: AuthFormProps) {
  const loginFormIsOpen = useSelector(selectLoginFormIsOpen);
  const registerFormIsOpen = useSelector(selectRegisterFormIsOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: registerFormIsOpen
      ? Yup.string()
          .min(2, 'Too short!')
          .max(50, 'Too long!')
          .required('Required')
      : Yup.string().notRequired(),
    email: Yup.string().email('Invalid email').required('Required!'),
    password: Yup.string().min(7, 'Too short!').required('Required!'),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      if (loginFormIsOpen) {
        await dispatch(
          logIn({ email: values.email, password: values.password }),
        ).unwrap();
      } else {
        await dispatch(register(values)).unwrap();
      }
      dispatch(closeModal());
      navigate('/nannies');
    } catch (error: any) {
      console.error('Auth error:', error);
    }
  };

  return (
    <>
      <AuthHeader />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className='flex flex-col gap-[18px]'>
          {registerFormIsOpen && (
            <FormField
              type='text'
              placeholder='Name'
              name='name'
            />
          )}
          <FormField
            type='email'
            placeholder='Email'
            name='email'
          />
          <PasswordField name='password' />
          <button
            type='submit'
            className='mt-[22px] w-full h-[52px] bg-[#103931] flex items-center justify-center 
            rounded-[30px] font-medium text-base leading-[125%] tracking-[-0.01em] text-[#fbfbfb]'
          >
            {loginFormIsOpen ? 'Log In' : 'Sign up'}
          </button>
        </Form>
      </Formik>
    </>
  );
}
