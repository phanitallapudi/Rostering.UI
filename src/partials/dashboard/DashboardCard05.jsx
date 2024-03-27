import React, { useState, useEffect } from 'react';
import Tooltip from '../../components/Tooltip';
import RealtimeChart from '../../charts/RealtimeChart';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard05() {

  // IMPORTANT:
  // Code below is for demo purpose only, and it's not covered by support.
  // If you need to replace dummy data with real data,
  // refer to Chart.js documentation: https://www.chartjs.org/docs/latest

  // Fake real-time data
  const [counter, setCounter] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [range, setRange] = useState(35);
  
  // Dummy data to be looped
  const data = [
    57, 57, 55, 54, 53, 52, 51, 52, 55, 56,
    53, 56, 58, 55, 58, 55, 58, 60, 61, 63,
    65, 64, 65, 62, 60, 59, 55, 59, 53, 51,
    50, 49, 48, 49, 47, 49, 50, 52, 54, 53,
    50, 58, 53, 57, 59, 59, 58, 59, 55, 57,
    50, 56, 57, 53, 55, 55, 53, 52, 50,
  ];

  const [slicedData, setSlicedData] = useState(data.slice(0, range));

  // Generate fake dates from now to back in time
  const generateDates = () => {
    const now = new Date();
    const dates = [];
    data.forEach((v, i) => {
      dates.push(new Date(now - 2000 - i * 2000));
    });
    return dates;
  };

  const [slicedLabels, setSlicedLabels] = useState(generateDates().slice(0, range).reverse());

  // Fake update every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter + 1);
    }, 2000);
    return () => clearInterval(interval)
  }, [counter]);

  // Loop through data array and update
  useEffect(() => {
    setIncrement(increment + 1);
    if (increment + range < data.length) {
      setSlicedData(([x, ...slicedData]) => [...slicedData, data[increment + range]]);
    } else {
      setIncrement(0);
      setRange(0);
    }
    setSlicedLabels(([x, ...slicedLabels]) => [...slicedLabels, new Date()]);
    return () => setIncrement(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  const chartData = {
    labels: slicedLabels,
    datasets: [
      // Indigo line
      {
        data: slicedData,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,          
          clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Previous 30 days tickets</h2>
        <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap">Built with <a className="underline" href="https://www.chartjs.org/" target="_blank" rel="noreferrer">Chart.js</a></div>
        </Tooltip>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <RealtimeChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard05;
