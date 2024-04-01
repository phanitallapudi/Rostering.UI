
// import axios from 'axios';

const accesstoken = localStorage.getItem('access_token');
console.log(accesstoken);


export async function getAllTechnicians() {
  const accesstoken = localStorage.getItem('access_token');
  console.log(accesstoken);
  try {
    const response = await axios.get('https://rostering-ai.onrender.com/technicians/all_technicians', {
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
    const response = await axios.get('https://rostering-ai.onrender.com/tickets/all_tickets', {
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
    const response = await axios.get(`https://rostering-ai.onrender.com/tickets/get_single_ticket?_id=${id}`);
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
    const apiUrl = `https://rostering-ai.onrender.com/technicians/nearest_technician?lat=${latitude}&long=${longitude}&skill_set=${encodedSkillSet}`;

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
      `https://rostering-ai.onrender.com/tickets/assign_ticket?ticket_id=${ticketId}&technician_id=${selectedTechnicianId}`,
      null, // No data payload for a PUT request
      { headers: headers } // Pass headers here
    );

    // Check if the response status is 200 (or any other success status code)
    if (response.status === 200) {
      // Reload the page
      window.location.reload();
    } else {
      // Handle other status codes if needed
      console.log("Failed to assign technician to ticket:", response.data.message);
    }
  } catch (error) {
    console.error("Error assigning technician to ticket:", error);
  }
}


export const fetchTicketGraphs = async () => {
  const accesstoken = localStorage.getItem('access_token');
  console.log(accesstoken);
  try {
    const response = await axios.get(`https://rostering-ai.onrender.com/infographics/get_infographics_tickets`,
    {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching ticket:', error);
  }
};



export const fetchTechniciansGraphs = async () => {
  const accesstoken = localStorage.getItem('access_token');
  console.log(accesstoken);
  try {
    const response = await axios.get(`https://rostering-ai.onrender.com/infographics/get_infographics_technicians`,
    {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching ticket:', error);
  }
};






export const fetchTicketInformation = async () => {
  try {
    // Assuming you have the access token stored in localStorage
    const accessToken = localStorage.getItem('access_token');

    const response = await axios.get('https://rostering-ai.onrender.com/llm/ticket_query', {
      params: {
        query: "status",
        ticket_id: "6604221d025a56d353295dec",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error fetching ticket information:', error);
  }
};




export async function assignAutomatically(ticketId) {
  const accesstoken = localStorage.getItem('access_token');
  console.log("This function is getting called from allTechnician.js file");
  console.log("Ticket ID:", ticketId);
  const headers = {
    Authorization: `Bearer ${accesstoken}`,
  };
  try {
    // Make the API call to assign technician to ticket using PUT method
    const response = await axios.put(
      `https://rostering-ai.onrender.com/tickets/auto_assign_ticket?ticket_id=${ticketId}`,
      null, // No data payload for a PUT request
      { headers: headers } // Pass headers here
    );

    // Check if the response status is 200 (or any other success status code)
    if (response.status === 200) {
      // Reload the page
      console.log(response.data.message);
      return response.data.message;
    } else {
      // Handle other status codes if needed
      console.log("Failed to assign technician to ticket:", response.data.message);
    }
  } catch (error) {
    console.error("Error assigning technician to ticket:", error);
  }
}