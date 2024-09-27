import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import SmsIcon from '@mui/icons-material/Sms';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';


const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/chat',
        icon: SmsIcon,
        active: pathname === '/chat',
      },
      {
        label: 'Users',
        href: '/users',
        icon: PeopleAltIcon,
        active: pathname === '/users',
      },
      
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
