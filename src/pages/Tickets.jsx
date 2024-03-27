import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import Banner from "../partials/Banner";
import TicketsTable from "../partials/dashboard/TicketsTable";
import { Divider } from "@mui/material";
import Header from "../partials/Header";

function Tickets() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            {/* <WelcomeBanner /> */}
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-2">
              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}
            </div>
            <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
          <Divider class="text-2xl mb-3">Ticket View</Divider>
            <TicketsTable />
          </div>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default Tickets;
