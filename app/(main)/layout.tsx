import DownSideBar from "@/components/down-side-bar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-[url(/./assets/backgrounds/account-bg.png)] bg-fixed bg-cover bg-right bg-no-repeat">
      <div className="pl-0 md:pl-20">
        <DownSideBar />
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
