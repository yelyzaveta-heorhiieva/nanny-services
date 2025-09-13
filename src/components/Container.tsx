import React from 'react';
import { useLocation } from 'react-router-dom';

export interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  const location = useLocation();
  return (
    <div
      className={`xls:px-24 px-8  mx-auto ${
        location.pathname === '/'
          ? 'xls:max-w-[1376px] xls:min-w-[1376px] min-w-[288px]'
          : 'xls:max-w-[1440px] xls:min-w-[1440px]'
      }`}
    >
      {children}
    </div>
  );
}
