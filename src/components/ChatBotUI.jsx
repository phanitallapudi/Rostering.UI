import React, { useState, useEffect } from 'react';

import axios from 'axios';

const ChatBotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [askedForQuery, setAskedForQuery] = useState(false);
  const [query, setQuery] = useState('');
  const [askedForTicketId, setAskedForTicketId] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const accessToken = localStorage.getItem('access_token');


  useEffect(() => {
    // Initial message asking for query when component mounts
    setTimeout(() => {
      setConversation([
        ...conversation,
        { text: "Enter your query:", isUser: false }
      ]);
    }, 1000);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (message.trim() === '') return;
  
    // Handling user input based on different stages
    if (!askedForQuery) {
      setQuery(message); // Set the query
      setConversation([
        ...conversation,
        { text: message, isUser: true }
      ]);
      setAskedForQuery(true);
      // Ask for ticket ID
      setTimeout(() => {
        setConversation([
          ...conversation,
          { text: "Enter the ticket ID:", isUser: false }
        ]);
      }, 1000);
    } else if (!askedForTicketId) {
      console.log("message: "+message);
      setTicketId(message); // Set the ticket ID
      setConversation([
        ...conversation,
        { text: message, isUser: true }
      ]);
      setAskedForTicketId(true);
      // Fetch data from API
      fetchData();
    } else {
      // Handle any further conversation here if needed
    }
    setMessage('');
    console.log("query: "+query);
    console.log("id: "+ticketId);
  };

  const fetchData = async () => {
    try {
      // Fetch data from the API using the provided query and ticket ID
      // const response = await axios.get(`http://127.0.0.1:8000/llm/ticket_query?query=${encodeURIComponent(query)}&ticket_id=${encodeURIComponent(ticketId)}`, {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //     Accept: 'application/json', // Changed 'accept' to 'Accept'
      //   },
      // });

      //////////////
      const response = await axios.get('http://127.0.0.1:8000/llm/ticket_query', {
      params: {
        query: query,
        ticket_id: ticketId,
        // query: query,
        // ticket_id: ticketId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // "Access-Control-Allow-Origin": "*",
      },
    });
 
  //   console.log(response.data);
  // } catch (error) {
  //   console.error('Error fetching ticket information:', error);
  // }
  
      // Axios automatically parses JSON response, so responseData is already an object
      console.log(response);
      console.log(response.data); // Access response data directly
  
      // Display response in conversation
      setConversation([
        ...conversation,
        { text: response.data.response, isUser: false }
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 border rounded-lg bg-white ${isOpen ? 'w-80' : 'w-16 h-16'}`}>
      <div className="flex items-center justify-center h-full cursor-pointer" onClick={toggleChat}>
        {!isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      {isOpen && (
        <div className="p-4">
          <div className="mb-4 text-lg font-semibold">Chatbot</div>
          <div className="mb-4 h-48 overflow-y-auto">
            {conversation.map((msg, index) => (
              <div key={index} className={`mb-2 p-2 rounded ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 mr-2 w-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={sendMessage} className="px-4 py-2 text-white bg-blue-500 rounded-md">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotUI;
