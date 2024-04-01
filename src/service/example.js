// ticketUtils.js
export default async function handleTicketId(ticketId) {
    const accessToken = localStorage.getItem('access_token');
    try {
        const response = await fetch(`https://rostering-ai.onrender.com/technicians/get_single_technician?_id=${ticketId}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
              },
        });
        const data = await response.json();
        console.log(data.name);
        console.log(ticketId)
        return data.name;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

