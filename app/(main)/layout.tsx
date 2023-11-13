import DownSideBar from "@/components/down-side-bar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pl-0 md:pl-20">
      <DownSideBar />
      {children}
    </main>
  );
};

export default MainLayout;
