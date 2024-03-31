import React, { useState, useEffect } from 'react';
import { BiEditAlt } from "react-icons/bi";
import { BiFolderPlus } from "react-icons/bi";
import { BiArchiveIn } from "react-icons/bi";

function DashboardCard12() {
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Fetch recent activity data from the API endpoint
    const accessToken = localStorage.getItem('access_token');
    const fetchRecentActivity = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/activity/get_recent_activity', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setRecentActivity(data);
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      }
    };

    fetchRecentActivity();
  }, []);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Recent Activity</h2>
      </header>
      <div className="p-3">
        {/* Card content */}
        {/* Recent activity items */}
        {recentActivity.map(activity => (
          <div key={activity._id}>
            {/* Only render header for "Yesterday" and older activities */}
            {activity.created_at.split(' ')[0] !== new Date().toISOString().split('T')[0] && (
              <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
                Yesterday
              </header>
            )}
            <ul className="my-1">
              <li className="flex px-2">
                {/* Render activity icon based on the 'tag' */}
                <div className={`w-9 h-9 rounded-full shrink-0 bg-${activity.tag === 'add' ? 'indigo' : activity.tag === 'modified' ? 'rose' : 'emerald'}-500 my-2 mr-3 flex items-center justify-center`}>
                  {activity.tag === 'add' ? (
                    <BiFolderPlus className="w-5 h-5 text-white" />
                  ) : activity.tag === 'modified' ? (
                    <BiEditAlt className="w-5 h-5 text-white" />
                  ) : (
                    <BiArchiveIn className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                  <div className="grow flex justify-between">
                    <div className="self-center">
                      {activity.activity}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardCard12;
