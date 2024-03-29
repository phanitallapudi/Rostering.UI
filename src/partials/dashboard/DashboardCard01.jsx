import React, { useState, useEffect } from "react";
import { IoTicketSharp } from "react-icons/io5";
import { PieChart } from "react-minimal-pie-chart";
import { fetchTicketInformationWithAuthorization } from "../../service/fetchTicket";

function DashboardCard01() {
  const [ticketData, setTicketData] = useState(null); // Initialize ticketData as null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTicketInformationWithAuthorization();
        setTicketData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching ticket information:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-56 flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <IoTicketSharp size={45} className="mb-5" />
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Total Tickets</h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-5">Total</div>
        {ticketData ? ( // Conditionally render if ticketData is not null
          <div className="flex items-start">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{ticketData.assigned + ticketData.close + ticketData.open}</div>
            <div className="text-sm font-semibold text-white px-1.5 bg-amber-500 rounded-full">
              +{ticketData.new_tickets_1day} New
            </div>
          </div>
        ) : (
          <div>Loading...</div> // Render a loading message while fetching data
        )}
      </div>
      {/* Chart built with Chart.js 3 */}
    </div>
  );
}

export default DashboardCard01;
