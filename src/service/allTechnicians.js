
import axios from 'axios';

const accesstoken = localStorage.getItem('access_token');
console.log(accesstoken);


export async function getAllTechnicians() {
  const accesstoken = localStorage.getItem('access_token');
  console.log(accesstoken);
  try {
    const response = await axios.get('http://127.0.0.1:8000/technicians/all_technicians', {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function getAllTickets() {
  const accesstoken = localStorage.getItem('access_token');
  console.log(accesstoken);
  try {
    const response = await axios.get('http://127.0.0.1:8000/tickets/all_tickets', {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}



export const fetchTicket = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/tickets/get_single_ticket?_id=${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching ticket:', error);
  }
};



export async function nearestTech(latitude, longitude, skillSet) {
  const accesstoken = localStorage.getItem('access_token');
  console.log(accesstoken);
  try {
      console.log("inside the function in service")
    // Encode skill set for URL
    const encodedSkillSet = encodeURIComponent(skillSet);

    // Construct URL with latitude, longitude, and skill set
    const apiUrl = `http://127.0.0.1:8000/technicians/nearest_technician?lat=${latitude}&long=${longitude}&skill_set=${encodedSkillSet}`;

    const headers = {
      Authorization: `Bearer ${accesstoken}`,
    };

    // Make API call
    const response = await fetch(apiUrl, { headers });
    const data = await response.json();

    // Log response from nearest technician
    console.log("Response from Nearest Technician from function:", data);

    return data; // Return response data if needed
  } catch (error) {
    console.error("Error fetching nearest technician:", error);
    throw error; // Propagate error if needed
  }
}

