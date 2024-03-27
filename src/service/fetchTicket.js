import axios from 'axios';

const fetchTicket = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/tickets/get_single_ticket?_id=${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching ticket:', error);
  }
};

export default fetchTicket;
