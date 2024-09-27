"use client";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { signOut } from "next-auth/react";
import DesktopSideNavItem from "./desktopSideNavItem";
import useRoutes from "@/hooks/useRoutes";

const DesktopSideNav: React.FC = () => {
  const routes = useRoutes();
  
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((route) => (
              <DesktopSideNavItem
                key={route.label}
                href={route.href}
                label={route.label}
                icon={route.icon}
                active={route.active}
              />
            ))}
          </ul>
        </nav>

        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="cursor-pointer hover:opacity-75 transition"
            title="Edit profile"
          >
            <ExitToAppIcon fontSize="large" color="primary" />
          </div>
        </nav>
      </div>
    </>
  );
};
export default DesktopSideNav;
