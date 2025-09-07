import React from 'react';
import { useLocation } from 'react-router-dom';

export interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  const location = useLocation();
  return (
    <div
      className={`px-32  ${
        location.pathname === '/'
          ? 'max-w-[1376px] min-w-[1376px]'
          : 'max-w-[1440px] min-w-[1440px]'
      }`}
    >
      {children}
    </div>
  );
}
