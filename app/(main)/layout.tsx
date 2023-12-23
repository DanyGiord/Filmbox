import DownSideBar from "@/components/down-side-bar";
import React from "react";
import DiscoverContextProvider from "./(routes)/_context/context-provider";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DiscoverContextProvider>
      <main className="bg-[url(/./assets/backgrounds/account-bg.png)] bg-fixed bg-cover bg-right bg-no-repeat">
        <div className="pl-0 md:pl-20">
          <DownSideBar />
          {children}
        </div>
      </main>
    </DiscoverContextProvider>
  );
};

export default MainLayout;
