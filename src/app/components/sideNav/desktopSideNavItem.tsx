'use client';

import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import Link from 'next/link';

interface DesktopSideNavItemProps {
  href: string;
  label: string;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  active?: boolean;
  onClick?: () => void;
}

const DesktopSideNavItem: React.FC<DesktopSideNavItemProps> = ({
  label,
  icon: Icon,
  href,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <li onClick={handleClick} title={label}>
      <Link
        href={href}
        className={clsx(
          'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100',
          active && 'bg-gray-100 text-black'
        )}
      >
        <Icon className="h-6 w-6 shrink-0" color='primary' />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};
export default DesktopSideNavItem;
