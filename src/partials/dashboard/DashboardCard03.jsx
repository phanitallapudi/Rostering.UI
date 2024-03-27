import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-02.svg';
import EditMenu from '../../components/DropdownEditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import { IoTicketSharp } from 'react-icons/io5';

function DashboardCard03() {
  return (
    <div className="flex flex-col h-56 col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <IoTicketSharp size={45} className="mb-5" />
          {/* Menu button */}
          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" to="#0">
                Option 1
              </Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" to="#0">
                Option 2
              </Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Completed</h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-5">Total</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">9</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-amber-500 rounded-full">+2 In queue</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
    </div>
  );
}

export default DashboardCard03;
