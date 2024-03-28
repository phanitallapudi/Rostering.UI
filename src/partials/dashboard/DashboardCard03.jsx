import React, { useState, useEffect } from 'react';
import { IoTicketSharp } from 'react-icons/io5';
import { fetchTicketInformationWithAuthorization } from '../../service/fetchTicket';

function DashboardCard03() {
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTicketInformationWithAuthorization();
        setTicketData(data);
      } catch (error) {
        console.error('Error fetching ticket information:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-56 col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <IoTicketSharp size={45} className="mb-5" />
          {/* Menu button */}
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Completed</h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-5">Total</div>
        {ticketData ? (
          <div className="flex items-start">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{ticketData.close}</div>
            <div className="text-sm font-semibold text-white px-1.5 bg-amber-500 rounded-full">
              +{ticketData.close} Completed
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      {/* Chart built with Chart.js 3 */}
    </div>
  );
}

export default DashboardCard03;
