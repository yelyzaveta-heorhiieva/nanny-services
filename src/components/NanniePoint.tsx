import React from 'react';

export interface NanniePointProps {
  icon: string;
  iconClass: string;
  children: React.ReactNode;
}

export default function NanniePoint({icon, iconClass, children}: NanniePointProps) {
  return (
    <p className="leading-[150%] sm:text-base text-xs items-center flex relative gap-2 lg:after:content-[''] lg:after:block after:w-[1px] lg:after:h-4 lg:after:bg-[rgba(17,16,28,0.2)] lg:after:absolute lg:after:right-0 lg:after:translate-x-4 lg:after:top-1/2 lg:after:-translate-y-1/2">
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
