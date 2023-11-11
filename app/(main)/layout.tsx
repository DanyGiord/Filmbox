import Sidebar from "@/components/sidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default MainLayout;
