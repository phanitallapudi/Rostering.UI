import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllTickets } from "../../service/allTechnicians";
import { Button, Tooltip } from "@mui/material"; // Import Tooltip
import { FaArrowDown, FaArrowRight, FaArrowUp } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
import High from '../../images/priority/high.png';
import Medium from '../../images/priority/medium.png';
import Low from '../../images/priority/low.png';

const TicketsTable = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortPriority, setSortPriority] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [error , setErrorMessage] = useState('');
  const itemsPerPage = 5;
  
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getAllTickets();
        setTickets(data);
        setFilteredTickets(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    const filtered = tickets.filter(ticket => {
      return ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
             (statusFilter === '' || ticket.status.toLowerCase() === statusFilter.toLowerCase());
    });
    setFilteredTickets(filtered);
  }, [searchTerm, statusFilter, tickets]);

  const handleSort = (sortBy) => {
    const sortedTickets = [...filteredTickets];
    sortedTickets.sort((a, b) => {
      if (sortBy === 'priority') {
        if (sortPriority === 'asc') {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      } else {
        if (sortPriority === 'asc') {
          return new Date(a[sortBy]) - new Date(b[sortBy]);
        } else {
          return new Date(b[sortBy]) - new Date(a[sortBy]);
        }
      }
    });
    setFilteredTickets(sortedTickets);
    setSortPriority(sortPriority === 'asc' ? 'desc' : 'asc');
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setSortPriority('asc');
    setCurrentPage(1);
    setFilteredTickets(tickets);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 mr-2"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 pr-8"
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="close">Close</option>
            <option value="assigned">Assigned</option>
          </select>
        </div>
        <div>
          <Button onClick={() => handleSort('priority')}>
            Sort by Priority
          </Button>
          <Button onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Id
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
  Priority
  <Tooltip title={
    <div className="flex gap-3">
    <label><img src={High} width="20" alt="High" /> High</label>
    <label><img className="text-center ml-3" src={Medium} width="20" alt="Medium" /> Medium</label>
    <label><img src={Low} width="20" alt="Low" /> Low</label>
  </div>
  }>
    <span className="ml-1 cursor-pointer dis"><IoIosInformationCircleOutline className="inline-block" /></span>
  </Tooltip>
</th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((ticket, index) => (
              <tr key={ticket._id} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index === currentItems.length - 1 ? '' : 'border-b'}`}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                >
                  {index + 1}
                </th>
                <td className="capitalize px-6 py-4 text-center">
                  {ticket.title}
                </td>
                <td className="capitalize px-6 py-4 flex justify-center items-center">
                  <div className={`px-1 py-1 w-20 text-center rounded-xl ${ticket.status.toLowerCase() === 'open' ? 'bg-green-400 text-white' : (ticket.status.toLowerCase() === 'assigned' ? 'bg-blue-400 text-white' : (ticket.status.toLowerCase() === 'close' ? 'bg-gray-400 text-white' : ''))}`}>
                    {ticket.status}
                  </div>
                </td>
                <td className="capitalize px-6 py-4 text-center">
                  <div className="inline-block">
                    {ticket.priority === 1 ? <img src={Low} width={"30px"} alt="Low" /> : ticket.priority === 2 ? <img src={Medium} width={"30px"} alt="Medium" /> : <img src={High} width={"30px"} alt="High" />}
                  </div>
                </td>
                <td className="px-6 py-4 flex justify-center items-center">
                  <Link to={`/tickets/${ticket._id}`}>
                    <FaRegEye className="cursor-pointer" size={25}/>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button 
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          {'<'}
        </button>
        {Array.from({ length: Math.ceil(filteredTickets.length / itemsPerPage) }, (_, i) => (
          (i + 1 === currentPage || i + 1 === currentPage - 1 || i + 1 === currentPage + 1) &&
          <button key={i} onClick={() => paginate(i + 1)} className={`mx-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 ${i + 1 === currentPage ? 'bg-gray-300' : ''}`}>
            {i + 1}
          </button>
        ))}
        <button 
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredTickets.length / itemsPerPage)}
          className="mx-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default TicketsTable;
