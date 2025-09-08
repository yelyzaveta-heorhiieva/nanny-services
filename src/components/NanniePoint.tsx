import React from 'react';

export interface NanniePointProps {
  icon: string;
  iconClass: string;
  children: React.ReactNode;
}

export default function NanniePoint({icon, iconClass, children}: NanniePointProps) {
  return (
    <p className="leading-[150%] items-center flex relative gap-2 after:content-[''] after:block after:w-[1px] after:h-4 after:bg-[rgba(17,16,28,0.2)] after:absolute after:right-0 after:translate-x-4 after:top-1/2 after:-translate-y-1/2">
      <svg
        width='16'
        height='16'
        className={iconClass}
      >
        <use href={`/icons.svg#${icon}`}></use>
      </svg>
      {children}
    </p>
  );
};
