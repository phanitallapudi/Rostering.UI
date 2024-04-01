import axios from 'axios';

export const fetchTicket = async (id) => {
  try {
    const response = await axios.get(`https://rostering-ai.onrender.com/tickets/get_single_ticket?_id=${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching ticket:', error);
  }
};


export const fetchTicketInformationWithAuthorization = async () => {
  const accessToken = localStorage.getItem('access_token');

  try {
    const response = await axios.get('https://rostering-ai.onrender.com/tickets/information', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Error fetching ticket information:', error);
  }
};
