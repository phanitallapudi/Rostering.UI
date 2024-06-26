import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Banner from "../partials/Banner";
//import AnalyticsReport from "../partials/dashboard/AnalyticsReport";
import { Divider } from "@mui/material";
import Header from "../partials/Header";
import AnalyticsGraphs from "../components/AnalyticsGraphs";
import { fetchTicketGraphs,fetchTechniciansGraphs  } from "../service/allTechnicians";
import AnalyticsGraphsTechnicainDetails from "./AnalyticsGraphsTechnicainDetails";

function Analytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [technicianGraph, settechnicianGraph] = useState([]);
  const [loadingGraphs , setIsLoadingGraphs] = useState(false);

  useEffect(()=> {
    const fetchTechnicianGraphsData = async () => {
      setIsLoadingGraphs(true);
      try {
        const data = await fetchTechniciansGraphs();
        console.log(data);
        settechnicianGraph(data);
      } catch (error) {
        console.log(error);
      }
      finally{
        setIsLoadingGraphs(false);
      }
    };
    fetchTechnicianGraphsData();
  },[])


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <Divider class="text-3xl">Analytics & Report</Divider>
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-2">
              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
            {/* Replace TicketsTable with AnalyticsReport */}
            {/* <AnalyticsReport /> */}
            <AnalyticsGraphsTechnicainDetails loadingGraphs={loadingGraphs} technicianGraph = {technicianGraph} />
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default Analytics;
