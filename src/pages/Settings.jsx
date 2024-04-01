import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Toaster, toast } from 'sonner'
import UploadFile from "../images/upload.png";
import Loader from "../components/Loader";
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const accessToken = localStorage.getItem('access_token');

  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setFileName(droppedFile.name);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileUpload = async () => {
    setIsLoading(true);
    try {
      if (!file) {
        toast.error('No file selected. Please select a file to upload.');
        console.error('No file selected');
        return;
      }

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

      console.log(response.data.message); // Handle response as needed
      toast.success(response.data.message);
      setFileName(""); // Clear file name after upload
      navigate('/roster')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        toast.error('Error uploading file: ' + error.response.data.detail);
      } else {
        toast.error('Error uploading file:', error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen overflow-hidden dark:bg-gray-800">
      <Toaster closeButton />
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden dark:bg-gray-800">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className='w-11/12 md:w-3/4 lg:w-1/2 xl:w-3/5 mx-auto py-5 px-2 mt-10 mb-10 text-2xl rounded-md'>
            Add Technicians Details By Uploading CSV File
          </div>
          <div className="modal w-11/12 md:w-3/4 lg:w-1/2 xl:w-3/5 mx-auto mt-10 mb-10 bg-white dark:bg-gray-700 rounded-md shadow-md">
            <div className="modal-body px-6 py-4">
              <h2 className="modal-title text-xl font-semibold mt-2 dark:text-white">Upload a file</h2>
              <p className="modal-description text-gray-500 dark:text-gray-300">Attach the CSV file below</p>
              <label htmlFor="fileInput" className="upload-area relative block mt-5 border border-dashed border-gray-400 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 px-12 py-8 text-center w-full cursor-pointer hover:border-blue-400 focus:border-blue-400 focus:outline-none" onDrop={handleDrop} onDragOver={handleDragOver}>
                <span className="upload-area-icon inline-block">
                  <img src={UploadFile} width={"40px"} alt="" />
                </span>
                <span className="upload-area-title font-semibold text-gray-800 dark:text-gray-200 block mt-1">Drag file(s) here to upload.</span>
                <span className="upload-area-description text-gray-500 dark:text-gray-400 block mt-1">
                  Alternatively, you can select a CSV file by <br /><strong>Clicking here</strong>
                </span>
                <input type="file" id="fileInput" className="hidden" onChange={handleFileInputChange} />
              </label>
              {fileName && (
                <p className="mt-2 text-gray-600 dark:text-gray-400"><span className="font-semibold">File selected: </span>{fileName}</p>
              )}
            </div>
            <div className="modal-footer flex justify-end px-6 py-4">
              <button className="btn-secondary py-2 px-4 bg-transparent border border-gray-400 dark:border-gray-600 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 focus:outline-none focus:border-blue-400">Cancel</button>
              <button className="btn-primary py-2 px-4 bg-blue-500 dark:bg-blue-600 rounded-md font-medium text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ml-3" onClick={handleFileUpload}>{loading ? <Loader /> : 'Upload'}</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
