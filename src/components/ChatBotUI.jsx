import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatBotUI = ({ ticketId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [askedForQuery, setAskedForQuery] = useState(false);
  const [query, setQuery] = useState('');
  const [accessToken] = useState(localStorage.getItem('access_token'));
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  useEffect(() => {
    setTimeout(() => {
      setConversation([
        ...conversation,
        { text: "Hello, How can I help you?", isUser: false }
      ]);
    }, 1000);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (message.trim() === '') return;

    if (!askedForQuery) {
      setQuery(message);
      setConversation([
        ...conversation,
        { text: message, isUser: true }
      ]);
      fetchData();
      setIsLoading(true); // Set loading indicator to true
    } else {
      // Handle any further conversation here if needed
    }
    setMessage('');
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/llm/ticket_query', {
        params: {
          query: message,
          ticket_id: ticketId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response.data); // Access response data directly

      setConversation(prevConversation => [
        ...prevConversation,
        { text: response.data.response, isUser: false }
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Set loading indicator to false regardless of success or failure
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 border rounded-lg bg-white shadow-lg ${isOpen ? 'w-85' : 'w-16 h-16'}`}>
      <div className="flex items-center justify-center h-full cursor-pointer" onClick={toggleChat}>
        {!isOpen ? (
          <svg className='w-8 h-8' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#5D3FD3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19c5.523 0 10-3.582 10-8s-4.477-8-10-8S2 6.582 2 11c0 2.157 1.067 4.114 2.801 5.553C4.271 18.65 3 20 2 21c3 0 4.527-.979 6.32-2.559 1.14.36 2.38.559 3.68.559z"/></svg>           
        ) : (
          <svg className='w-6 h-6 mt-5 mr-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </div>
      {isOpen && (
        <div className="p-4 flex flex-col min-h-[450px] max-h-[450px] overflow-y-auto">
          <div className="mb-4 text-lg font-bold text-purple-600">Chatbot</div>
          <div className="flex-1 mb-4 overflow-y-auto">
            {conversation.map((msg, index) => (
              <div key={index} className={`flex justify-${msg.isUser ? 'end' : 'start'}`}>
                <div className={`p-2 mt-2 rounded-lg max-w-xs ${msg.isUser ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-black mr-auto'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && ( // Show loader if isLoading is true
              <div className="flex justify-start">
                <div className="loader p-2 mt-1 flex flex-row gap-[2px] rounded-lg max-w-xs bg-gray-200 text-black mr-auto">
                <div class='h-3 w-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div class='h-3 w-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div class='h-3 w-3 bg-gray-500 rounded-full animate-bounce'></div>
                </div>
              </div>
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 mr-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={sendMessage} className="px-4 py-2 text-white bg-blue-500 rounded-md">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotUI;
