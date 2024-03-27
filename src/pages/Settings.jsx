import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import Banner from "../partials/Banner";
import axios from 'axios';

function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [file, setFile] = useState(null);
  const accessToken = localStorage.getItem('access_token')

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8000/technicians/upload_technician_files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}` // Replace accessToken with your actual access token
        }
      });

      console.log(response.data); // Handle response as needed
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

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
            <div className="flex justify-end ml-8 items-center w-3/5 mb-5 ">
            <h1 className="text-3xl justify-start">Add Technicians By Uploading Files</h1>
            </div>
            {/* Dashboard actions */}
            <div className="flex justify-center items-center flex-col">
              <div className="flex items-center justify-center w-3/5">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      CSV 
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
              <div className="flex w-3/5 mt-4 justify-end">
            <button className="text-gray-900 bg-blue-600 border border-blue-300 focus:outline-none hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleFileUpload}>Upload File</button>
              </div>
            </div>
            {/* Cards */}
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Settings;