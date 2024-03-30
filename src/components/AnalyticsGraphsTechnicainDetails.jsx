import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const AnalyticsGraphsTechnicainDetails = ({ technicianGraph, loadingGraphs }) => {
  const [modalImage, setModalImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
    setZoomLevel(1);
  };

  const zoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(0.1, prevZoom - 0.1));
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = modalImage;
    link.download = "technician_graph_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getRandomText = () => {
    const texts = [
      "Crunching the latest data, Just for you, Hang tight...",
      "Hatching some fresh data, Just for you, Bunny up...",
      "Diving into the latest egg-citing data, Just for you, Hop on...",
      "Analyzing the newest insights, Just for you, Keep an eye out for blossoming trends..."
    ];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
  };

  return (
    <div>
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
        {loadingGraphs && (
          <div className="flex flex-col items-center justify-center h-48">
            <Loader />
            <div className="text-center text-gray-600 mt-2">
              {getRandomText()}
            </div>
          </div>
        )}
        {technicianGraph.map((graph, index) => {
          const base64String = Object.values(graph)[0];
          const imageSrc = `data:image/png;base64,${base64String}`;
          return (
            <div key={index} className="flex justify-center">
              <img
                className="h-auto rounded-lg object-center cursor-pointer"
                src={imageSrc}
                alt={`Graph ${index}`}
                style={{ padding: "10px" }} // Example padding, adjust as needed
                onClick={() => openModal(imageSrc)}
              />
            </div>
          );
        })}
      </div>
      {modalImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-lg mx-auto relative">
            <img
              src={modalImage}
              alt="Modal"
              className="max-w-full max-h-full"
              style={{ transform: `scale(${zoomLevel})` }}
            />
            <div className="absolute top-0 right-0 m-4 flex space-x-2">
              <button
                onClick={zoomIn}
                className="text-white bg-gray-800 rounded-full p-2"
              >
                +
              </button>
              <button
                onClick={zoomOut}
                className="text-white bg-gray-800 rounded-full p-2"
              >
                -
              </button>
              <button
                onClick={downloadImage}
                className="text-white bg-gray-800 rounded-full p-2"
              >
                Download
              </button>
              <button
                onClick={closeModal}
                className="text-white bg-gray-800 rounded-full p-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsGraphsTechnicainDetails;
