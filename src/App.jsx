import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import { Toaster, toast } from 'sonner'
import Sidebar from './partials/Sidebar';
import Tickets from './pages/Tickets';
import Roster from './pages/Roster';
import AnalyticsReport from './partials/dashboard/AnalyticsReport';
import Analytics from './pages/Analytics';
import ScheduleAndDispatch from './pages/ScheduleAndDispatch';
import TicketManagement from './pages/TicketManagement';
import SingleTicket from './pages/SingleTicket';
import Login from './pages/Login';
import Settings from './pages/Settings';
import AnalyticsGraphsTechnician from './components/AnalyticsGraphsTechnician';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <Toaster />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/tickets" element={<Tickets />} />
        <Route exact path="/tickets/id" element={<TicketManagement />} />
        <Route exact path="/roster" element={<Roster />} />
        <Route exact path="/dispatch" element={<ScheduleAndDispatch />} />
        <Route exact path="/analytics" element={<Analytics />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/roster" element={<Roster />} />
        <Route exact path="/technicianGraph" element={<AnalyticsGraphsTechnician />} />
        <Route exact path="/tickets/:id" element={<SingleTicket/>} />
      </Routes>
    </>
  );
}

export default App;
