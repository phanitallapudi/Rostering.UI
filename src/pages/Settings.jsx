import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import UploadFile from "../images/upload.png";

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [file, setFile] = useState(null);
  const accessToken = localStorage.getItem('access_token');

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        "http://localhost:8000/technicians/upload_technician_files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            accept: "application/json",
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

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
    <div className="modal w-11/12 md:w-3/4 lg:w-1/2 xl:w-3/5 mx-auto mt-10 mb-10 bg-white rounded-md shadow-md">
      {/* <div className="modal-header flex items-start justify-between px-6 py-6"> */}
        {/* <div className="modal-logo">
          <span className="logo-circle w-14 h-14 flex justify-center items-center rounded-full bg-blue-200">
            // svg logo
          </span>
        </div> */}
        {/* <button className="btn-close flex items-center justify-center w-10 h-10 rounded-md border border-transparent hover:bg-blue-200 focus:outline-none focus:bg-blue-200">
          // Close Icon
        </button> */}
      {/* </div> */}
      <div className="modal-body px-6 py-4">
        <h2 className="modal-title text-xl font-semibold mt-2">Upload a file</h2>
        <p className="modal-description text-gray-500">Attach the CSV file below</p>
        <label htmlFor="fileInput" className="upload-area relative block mt-5 border border-dashed border-gray-400 rounded-lg bg-white px-12 py-8 text-center w-full cursor-pointer hover:border-blue-400 focus:border-blue-400 focus:outline-none" onDrop={handleDrop} onDragOver={handleDragOver}>
          <span className="upload-area-icon inline-block">
            <img src={UploadFile} width={"40px"} alt="" />
          </span>
          <span className="upload-area-title font-semibold text-gray-800 block mt-1">Drag file(s) here to upload.</span>
          <span className="upload-area-description text-gray-500 block mt-1">
            Alternatively, you can select a CSV file by <br /><strong>Clicking here</strong>
          </span>
          <input type="file" id="fileInput" className="hidden" onChange={handleFileInputChange} />
        </label>
      </div>
      <div className="modal-footer flex justify-end px-6 py-4">
        <button className="btn-secondary py-2 px-4 bg-transparent border border-gray-400 rounded-md font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:border-blue-400">Cancel</button>
        <button className="btn-primary py-2 px-4 bg-blue-500 rounded-md font-medium text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ml-3" onClick={handleFileUpload}>Upload File</button>
      </div>
    </div>
    </main>
    </div>
    </div>
  );
};

export default Settings;
