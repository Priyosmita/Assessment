import React from "react";
import Header from "@/app/components/dashboard/Header";
import Sidebar from "@/app/components/dashboard/LeftSideBar";
import DashboardContent from "@/app/components/dashboard/DashboardContent";
const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        {/* Main content goes here */}
        <div className="pt-16">
          {/* Page content below the header */}
          <div><DashboardContent/></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;