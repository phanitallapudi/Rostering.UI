import axios from 'axios';

export const fetchTicket = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/tickets/get_single_ticket?_id=${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching ticket:', error);
  }
};


export const fetchTicketInformationWithAuthorization = async () => {
  const accessToken = localStorage.getItem('access_token');

  try {
    const response = await axios.get('http://127.0.0.1:8000/tickets/information', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Error fetching ticket information:', error);
  }
};
