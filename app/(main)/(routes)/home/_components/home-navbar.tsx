"use client";

import { ActionTooltip } from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import { useConvex, useConvexAuth } from "convex/react";
import { Loader, Menu } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const routes = [
  {
    id: 1,
    label: 'Movies',
    path: '/home/movies'
  },
  {
    id: 2,
    label: 'Series',
    path: '/home/series'
  },
  {
    id: 3,
    label: 'TV Shows',
    path: '/home/tv-shows'
  },
]

const HomeNavbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [openNav, setOpenNav] = useState(false);

  const router = useRouter();

  const clerk = useClerk();
  const { user } = useUser();

  const handleNav = () => {
    setOpenNav(prev => !prev);
  }

  const convex = useConvex();

  const [existingProfile, setExistingProfile] = useState(false)

  useEffect(() => {
    let ignore = false;
    if (user) {
      convex.query(api.user.getUser, { userId: user.id })
        .then(userData => {
          // Obradite podatke korisnika
          if(userData && !ignore) {
            setExistingProfile(true)
          }
        })
        .catch(error => {
          // Obradite grešku
          console.log(error);
        });
    }
    return () => { ignore = true }
  }, [user, convex]);

  const redirectToCustomizePage = () => {
    return router.push('/customize');
  }

  return (
    <div className="flex items-center justify-between p-5 bg-transparent py-2 md:py-5 px-8 lg:px-20">
      <div className="w-3/12 md:hidden">
        <Menu className="w-8 h-8 block  text-white mt-1" onClick={handleNav} />
      </div>
      <div className={cn(
        "w-7/12 flex flex-col gap-x-5 items-end gap-y-1.5 absolute top-20 -left-96 rounded-xl border p-5 border-black_main bg-black_third",
        "md:w-2/6 md:justify-start md:flex-row md:items-center md:-translate-x-0 mx:gap-x-8 transition-all md:static md:border-none md:p-0 md:bg-transparent",
        openNav && "-translate-x-[130px] -left-0"
      )}>
        {routes.map(route => (
          <Link key={route.id} href={route.path} className={cn(
            "text-gray hover:text-white_text transition",
            ""
          )}>
            {route.label}
          </Link>
        ))}
      </div>
      <div className={cn(
        "w-3/6 flex justify-center",
        "md:w-2/6"
      )}>
        <Image
          src="/assets/logo.svg"
          alt="flexbox-logo"
          width={137}
          height={30}
        />
      </div>
      <div className={cn(
        "flex pt-1.5 w-3/12 justify-end",
        "md:w-2/6",
        isLoading && "pr-1 md:pr-20"
      )}>
        {isLoading ? (
          <Loader className="h-4 w-4 animate-spin text-white_text" />
        ) : (
          <>
            {!existingProfile && (
              <Button variant="skew" className="mt-0 mx-4 scale-90" onClick={redirectToCustomizePage}>
                Customize profile
              </Button>
            )}
            <ActionTooltip label="Edit Profile" side="bottom" align="center">
              <div
                onClick={() => clerk.openUserProfile()}
                role="button"
                className="group flex items-center gap-x-2"
              >
                {(user?.firstName !== null || user?.firstName !== undefined) && (
                  <>
                    {/* <ChevronDown className="w-4 h-4 mt-0.5 text-white_text/80 group-hover:text-white_text transition hidden md:inline" /> */}
                    <span className="text-gray group-hover:text-white_text transition text-base hidden md:inline">{`${user?.firstName
                      } ${(user?.lastName !== null || user?.lastName !== undefined) ? user?.lastName : ""}`}</span>
                  </>
                )}
                <UserButton
                  afterSignOutUrl="/sign-in"
                  appearance={{
                    elements: {
                      avatarBox: "rounded-full border border-2 border-red",
                    },
                  }}
                />
              </div>
            </ActionTooltip>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeNavbar;
