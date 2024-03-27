
// import axios from 'axios';

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
      // console.log("inside the function in service")
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
    // console.log("Response from Nearest Technician from function:", data);

    return data; // Return response data if needed
  } catch (error) {
    console.error("Error fetching nearest technician:", error);
    throw error; // Propagate error if needed
  }
}

import axios from 'axios';

export async function assignManually(selectedTechnicianId, ticketId) {
  const accesstoken = localStorage.getItem('access_token');
  console.log("This function is getting called from allTechnician.js file");
  console.log("Selected technician ID:", selectedTechnicianId);
  console.log("Ticket ID:", ticketId);
  const headers = {
    Authorization: `Bearer ${accesstoken}`,
  };
  try {
    // Make the API call to assign technician to ticket using PUT method
    const response = await axios.put(
      `http://127.0.0.1:8000/tickets/assign_ticket?ticket_id=${ticketId}&technician_id=${selectedTechnicianId}`,
      null, // No data payload for a PUT request
      { headers: headers } // Pass headers here
    );

    // Check if the response status is 200 (or any other success status code)
    if (response.status === 200) {
      // Display a message indicating that the page will refresh
      console.log("Page will refresh in 3 seconds...");

      // Start a countdown timer
      let count = 3;
      const timer = setInterval(() => {
        console.log(`Refreshing in ${count}...`);
        count--;

        // When countdown finishes, reload the page
        if (count === 0) {
          clearInterval(timer);
          // Reload the page
          window.location.reload();
        }
      }, 1000);
    } else {
      // Handle other status codes if needed
      console.log("Failed to assign technician to ticket:", response.data.message);
    }
  } catch (error) {
    console.error("Error assigning technician to ticket:", error);
  }
}

