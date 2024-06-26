import React, { useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import Banner from '../partials/Banner';
import { Navigate, useNavigate } from 'react-router';
import AuthCheckToken from '../components/Authchecktoken';
// import { fetchTicketInformation } from '../service/allTechnicians';


function Dashboard() {
  //useAuth();
  // fetchTicketInformation(); 
  const navigate = useNavigate();
  const authcheck = localStorage.getItem('access_token');

  useEffect(()=>{
    if(!authcheck){
      navigate('/');
    }
  },[authcheck])

  useEffect(() => {
    if (AuthCheckToken(authcheck)) {
      localStorage.removeItem('access_token'); // Remove the expired token
      navigate('/'); // Redirect to the login page
    }
 }, [authcheck, history]);



  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 />
              {/* Bar chart (Direct vs Indirect) */}
              <DashboardCard04 />
              {/* Line chart (Real Time Value) */}
              <DashboardCard12 />
              {/* Doughnut chart (Top Countries) */}
              <DashboardCard11 />
              {/* Table (Top Channels) */}
              
              {/* Line chart (Sales Over Time) */}
             
              {/* Stacked bar chart (Sales VS Refunds) */}
             
              {/* Card (Customers) */}
             
              {/* Card (Reasons for Refunds) */}
             
              {/* Card (Recent Activity) */}
              
              {/* Card (Income/Expenses) */}
            
            </div>
          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Dashboard;