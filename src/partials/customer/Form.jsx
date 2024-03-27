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
      <Divider class="text-xl">Technician Schedule</Divider>
      <TextareaAutosize
        aria-label="textarea"
        placeholder="Type your text here"
        value={textareaValue}
        onChange={handleTextareaChange}
        style={{ width: '100%', minHeight: 100, marginTop: 10 }}
      />
      <Divider>DatePicker</Divider>
      <TextField
        id="date"
        label="Select Date"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        style={{ width: '100%', marginTop: 10 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
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
  );
}
