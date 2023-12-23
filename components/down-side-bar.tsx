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
import { UserButton, useUser } from "@clerk/nextjs";
import { ActionTooltip } from "@/components/action-tooltip";

const routes = [
  {
    id: 3,
    path: "/home",
    Icon: Home,
    label: "Home",
  },
  {
    id: 1,
    path: "/discover",
    Icon: LayoutDashboard,
    label: "Discover",
  },
  {
    id: 2,
    path: "/account",
    Icon: User,
    label: "Account",
  },
  {
    id: 5,
    path: "/messages",
    Icon: MessageSquare,
    label: "Messages",
  },
  {
    id: 4,
    path: "/favorites",
    Icon: Heart,
    label: "Favorites",
  },
];

const DownSideBar = () => {
  const { isLoaded } = useUser();
    const pathname = usePathname();

  return (
    // <div className="h-screen w-screen">
      
    // </div>
    <aside className="
    w-full h-20 fixed bottom-0 left-0 right-0 flex flex-row z-[9999999] rounded-t-3xl bg-black_second
    md:w-20 md:h-full md:top-0 md:rounded-tl-none md:rounded-r-3xl md:flex-col
    "
    >
      <Link href='/home' className="hidden absolute top-7 left-[25px] right-1 justify-center w-7 h-7 md:flex">
        <Image src="/assets/mini_logo.svg" alt="logo" width={28} height={28} />
      </Link>
      <div className="
      w-full h-full flex flex-row items-center justify-evenly gap-x-4 gap-y-10 pr-1
      md:flex-col md:justify-center
      "
      >
        {routes.map((route) => (
          <div key={route.id} className={`order-${route.id} md:order-none`}>
            <ActionTooltip side="right" align="center" label={route.label}>
              <Link href={route.path} key={route.id}>
                <route.Icon
                  className={cn(
                    `w-10 md:w-7 h-10 md:h-7 text-gray hover:text-white_text hover:scale-[1.15] transition-all`,
                    pathname === route.path && "text-white_text scale-125 md:scale-100 mb-1 md:mb-0",
                  )}
                />
              </Link>
            </ActionTooltip>
          </div>
        ))}
      </div>
      <div className="hidden absolute bottom-7 left-0 right-5 md:right-1 justify-center md:flex">
        <UserButton afterSignOutUrl="/sign-in"/>
      </div>
    </aside>
  );
};

export default DownSideBar;
