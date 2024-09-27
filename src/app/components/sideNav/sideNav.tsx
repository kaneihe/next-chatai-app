import DesktopSideNav from "./desktopSideNav";

function SideNav({ children }: { children: React.ReactNode }) {
  return (
    <div className=" h-full">
      <DesktopSideNav />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default SideNav;
