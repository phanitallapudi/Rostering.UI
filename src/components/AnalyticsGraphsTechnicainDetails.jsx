import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const AnalyticsGraphsTechnicainDetails = ({ technicianGraph, loadingGraphs }) => {
  console.log(technicianGraph);
  return (
    <div>
      {/* {loadingGraphs && <Loader/>} */}
      <div className="flex items-center justify-start py-4 md:py-2 flex-wrap">
        <Link
          type="button"
          to="/analytics"
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Tickets Graphs
        </Link>
        <Link
          type="button"
          to="/technicianGraph"
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Technician Graphs
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {loadingGraphs && <Loader/>}
        {technicianGraph.map((graph, index) => {
          const base64String = Object.values(graph)[0];
          const imageSrc = `data:image/png;base64,${base64String}`;
          return (
            <div key={index} className="flex justify-center">
              <img
                className="h-auto rounded-lg object-center"
                src={imageSrc}
                alt={`Graph ${index}`}
                style={{ padding: "10px" }} // Example padding, adjust as needed
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalyticsGraphsTechnicainDetails;
