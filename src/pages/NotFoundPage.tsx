import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export interface NotFoundPageProps {}

export default function NotFoundPage({}: NotFoundPageProps) {
const [counter, setCounter] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    if (counter === 0) {
      navigate('/');
    }

    return () => clearInterval(id);
  }, [counter]);

  return (
    <div className='container'>
      <p className='flex flex-col gap-2.5 items-center justify-end text-xl text-center font-semibold h-[50vh] leading-normal mb-[30px]'>
        Page is not found, after <span className='text-[var(--main)]'>{counter}s</span>
        you will be redirected to the home page
      </p>
    </div>
  );
};