// nearestTech.js
async function nearestTech(latitude, longitude, skillSet) {
    try {
        console.log("inside the function in service")
      // Encode skill set for URL
      const encodedSkillSet = encodeURIComponent(skillSet);
  
      // Construct URL with latitude, longitude, and skill set
      const apiUrl = `https://rostering-ai.onrender.com/technicians/nearest_technician?lat=${latitude}&long=${longitude}&skill_set=${encodedSkillSet}`;
  
      // Make API call
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Log response from nearest technician
      console.log("Response from Nearest Technician from function:", data);
  
      return data; // Return response data if needed
    } catch (error) {
      console.error("Error fetching nearest technician:", error);
      throw error; // Propagate error if needed
    }
  }

  export default nearestTech;