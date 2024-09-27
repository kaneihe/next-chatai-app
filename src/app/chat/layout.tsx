import SideNav from "@/components/sideNav/sideNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Ultimate AI Chat Experience",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideNav>
      <div className="h-full">{children}</div>
    </SideNav>
  );
}
