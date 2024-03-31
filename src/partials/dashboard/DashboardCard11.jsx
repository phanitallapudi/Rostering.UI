import React, { useState, useEffect } from 'react';
import BarChart from '../../charts/BarChart03';
import axios from 'axios';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard11() {
  const [selectedOption, setSelectedOption] = useState('cable repair');
  const [topTechnicians, setTopTechnicians] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/technicians/top_technicians', {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          params: {
            category: selectedOption // Pass the selected option as a query parameter
          }
        });
        setTopTechnicians(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedOption]); // Fetch data whenever selectedOption changes

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const technicians = topTechnicians[selectedOption] || [];

  let chartData = {};

  if (technicians.length > 0) {
    chartData = {
      labels: ['Technicians'],
      datasets: technicians.slice(0, 5).map((technician, index) => ({
        label: technician,
        data: [index + 1],
        backgroundColor: tailwindConfig().theme.colors.indigo[500 - (index * 100)],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600 - (index * 100)],
        barPercentage: 1,
        categoryPercentage: 1,
      })),
    };
  } else {
    chartData = {
      labels: ['Technicians'],
      datasets: [{ label: 'No data available', data: [0], backgroundColor: 'grey' }],
    };
  }

  if (chartData.datasets.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Technicians Rankings</h2>
      </header>
      <div className="px-5 py-3">
        <select
          value={selectedOption}
          onChange={handleChange}
          className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700"
        >
          <option value="">Select an option</option>
          {Object.keys(topTechnicians).map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="grow">
        <BarChart data={chartData} width={595} height={48} />
      </div>
    </div>
  );
}

export default DashboardCard11;
