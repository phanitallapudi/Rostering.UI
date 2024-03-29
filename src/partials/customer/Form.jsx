import React from 'react';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const locations = [
  {
    value: 'location1',
    label: 'Location 1',
  },
  {
    value: 'location2',
    label: 'Location 2',
  },
  {
    value: 'location3',
    label: 'Location 3',
  },
];

const technicians = [
  {
    value: 'technician1',
    label: 'Technician 1',
  },
  {
    value: 'technician2',
    label: 'Technician 2',
  },
  {
    value: 'technician3',
    label: 'Technician 3',
  },
];

export default function Form() {
  const [textareaValue, setTextareaValue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };


  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTechnicianChange = (event) => {
    setSelectedTechnician(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted!');
  };

  return (
    <div>
      <div class="text-2xl">Technician Schedule</div>
      {/* <Divider> */}
      <Divider>Technician</Divider>
      <TextField
        select
        label="Select Technician"
        value={selectedTechnician}
        onChange={handleTechnicianChange}
        variant="outlined"
        style={{ width: '100%', marginTop: 10 }}
      >
        {technicians.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <div className="w-full mt-6">
      <Divider>Assign a Date</Divider>
      {/* <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Select a Date:</label> */}
      <input
        id="date"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="block w-44 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        style={{ marginTop: '10px', marginBottom: '40px' }}
      />
      </div>
      {/* </Divider> */}
      <Divider>Time</Divider>
      <div className="w-full">
      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Select a Time:</label>
      <input
        id="time"
        type="time"
        value={selectedTime}
        onChange={handleTimeChange}
        className="block w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        style={{ marginTop: '10px', marginBottom: '20px' }}
      />
      
      <Divider>Location</Divider>
      <TextField
        select
        label="Select Location"
        value={selectedLocation}
        onChange={handleLocationChange}
        variant="outlined"
        style={{ width: '100%', marginTop: 10 }}
        >
        {locations.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>
        Submit
      </Button>
    </div>
        </div>
    
  );
}
