'use client'

import Image from "next/image";
import {
  Home,
  LayoutDashboard,
  User,
  MessageSquare,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ActionTooltip } from "@/components/action-tooltip";

const routes = [
  {
    id: 1,
    path: "/home",
    Icon: Home,
    label: "Home",
  },
  {
    id: 2,
    path: "/discover",
    Icon: LayoutDashboard,
    label: "Discover",
  },
  {
    id: 3,
    path: "/account",
    Icon: User,
    label: "Account",
  },
  {
    id: 4,
    path: "/messages",
    Icon: MessageSquare,
    label: "Messages",
  },
  {
    id: 5,
    path: "/favorites",
    Icon: Heart,
    label: "Favorites",
  },
];

const Sidebar = () => {
    const pathname = usePathname();

  return (
    <aside className="w-20 h-full fixed left-0 top-0 rounded-r-3xl bg-black_second">
      <div className="absolute top-7 left-0 right-1 flex justify-center">
        <Image src="/assets/mini_logo.svg" alt="logo" width={28} height={28} />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-10 pr-1">
        {routes.map((route) => (
          <ActionTooltip side="right" align="center" label={route.label}>
            <Link href={route.path} key={route.id}>
              <route.Icon
                className={cn(
                  "w-7 h-7 text-[#565656] hover:text-white_text transition",
                  pathname === route.path && "text-white_text"
                )}
              />
            </Link>
          </ActionTooltip>
        ))}
      </div>
      <div className="absolute bottom-7 left-0 right-1 flex justify-center">
        <UserButton afterSignOutUrl="/sign-in"/>
      </div>
    </aside>
  );
};

export default Sidebar;
