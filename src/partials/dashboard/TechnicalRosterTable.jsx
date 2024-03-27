import React, { useState, useEffect } from 'react';
import { getAllTechnicians } from '../../service/allTechnicians';
import { Button } from '@mui/material';
import { FaRegEye } from 'react-icons/fa';

const TechnicalRosterTable = () => {
  const [technicians, setTechnicians] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'booked', 'free'
  const [sortBy, setSortBy] = useState(null); // 'rating', 'experience'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const maxPageNumbersToShow = 2; // Maximum number of page numbers to show at once

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const data = await getAllTechnicians();
        setTechnicians(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchTechnicians();
  }, []);

  const filteredTechnicians = technicians.filter((technician) => {
    if (searchTerm && !technician.skill_set.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'all' && technician.day_schedule.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  const sortedTechnicians = sortBy ? filteredTechnicians.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  }) : filteredTechnicians;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTechnicians = sortedTechnicians.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedTechnicians.length / itemsPerPage);

  // Calculate the range of page numbers to display
  const pageNumbersToShow = [];
  for (let i = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2)); i <= Math.min(totalPages, currentPage + Math.floor(maxPageNumbersToShow / 2)); i++) {
    pageNumbersToShow.push(i);
  }

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1); // Reset pagination when changing status filter
  };

  const handleSortChange = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
    setCurrentPage(1); // Reset pagination when changing sorting criteria
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="text"
            placeholder="Search by skill set"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md px-2 py-1 mr-2"
          />
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="border border-gray-300 rounded-md px-3 py-1 pr-8"
          >
            <option value="all">All Schedule</option>
            <option value="booked">Booked</option>
            <option value="free">Free</option>
          </select>
        </div>
        <div>
          <Button onClick={() => handleSortChange('rating')}>Sort by Rating</Button>
          <Button onClick={() => handleSortChange('experience_years')}>Sort by Experience</Button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        {errorMessage && <p id="message" className="text-red-600">{errorMessage}</p>}
        <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Id</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Skill Set</th>
              <th scope="col" className="px-6 py-3">Rating</th>
              <th scope="col" className="px-6 py-3">Experience</th>
              <th scope="col" className="px-6 py-3">Location</th>
              <th scope="col" className="px-6 py-3">Schedule</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTechnicians.map((technician) => (
              <tr key={technician._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {technician.uid}
                </th>
                <td className="capitalize px-6 py-4">{technician.name}</td>
                <td className="capitalize px-6 py-4">{technician.skill_set}</td>
                <td className="capitalize px-6 py-4 text-center">{technician.rating}</td>
                <td className="capitalize px-6 py-4 text-center">{technician.experience_years}</td>
                <td className="capitalize px-6 py-4">{technician.current_location.join(', ')}</td>
                <td className="capitalize px-6 py-4">
                <div className={`px-1 py-1 w-16 text-center rounded-xl ${technician.day_schedule.toLowerCase() === 'booked' ? 'bg-gray-400 text-white' : (technician.day_schedule.toLowerCase() === 'free' ? 'bg-green-400 text-white' : '')}`}>
                    {technician.day_schedule}
                  </div>
                </td>
                <td className="px-6 py-4">{technician.phoneno}</td>
                <td className="px-6 py-4 text-center">
                  <FaRegEye className="cursor-pointer" size={25} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 mb-4 flex justify-center">
          <button onClick={prevPage} className="mx-1 px-3 py-1 rounded-md bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-800">
            {'<'}
          </button>
          {pageNumbersToShow.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`mx-1 px-3 py-1 rounded-md ${currentPage === number ? 'bg-gray-200 text-gray-800' : 'bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-800'}`}
            >
              {number}
            </button>
          ))}
          <button onClick={nextPage} className="mx-1 px-3 py-1 rounded-md bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-800">
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalRosterTable;