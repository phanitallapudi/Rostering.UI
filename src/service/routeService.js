// routeService.js

const fetchRoutePoints = async (userLocation, techLocation) => {
    try {
        // Get the access token from localStorage
        const accessToken = localStorage.getItem('access_token');
        
        // Encode userLocation and techLocation for URL
        const encodedUserLocation = encodeURIComponent(userLocation);
        const encodedTechLocation = encodeURIComponent(techLocation);

        // Construct the URL with encoded userLocation and techLocation
        const url = `https://rostering-ai.onrender.com/technicians/calculate_route?origin=${userLocation}&destination=${techLocation}`;

        // Fetch route points from the URL with headers
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Parse response JSON
        // const data = await response.json();

        // Log userLocation and techLocation
        console.log("User Location:", userLocation);
        console.log("Tech Location:", techLocation);
        const data = await response.json();
        console.log(data.routes[0].legs[0].points);

        // Return the fetched route points
        console.log(data);
        // return data.points;
        console.log(data.routes[0].summary);
        return data;
    } catch (error) {
        console.error('Error fetching route points:', error);
        throw error;
    }
};

export default fetchRoutePoints;
