import React from 'react';
import { NavLink } from 'react-router-dom';

export interface NavItemProps { 
    link: string;
  name: string;
  onClick?: () => void;
}

const buildLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive
    ? "relative after:content-[''] after:block after:size-2 after:bg-[#fbfbfb] after:rounded after:absolute after:bottom-[-12px] after:left-1/2 after:translate-x-[-50 %]"
    : '';
};

export default function NavItem({link, name, onClick}: NavItemProps) {
  return (
    <div>
      <li>
        <NavLink to={link} className={buildLinkClass} onClick={onClick}>
          {name}
        </NavLink>
      </li>
    </div>
  );
};
