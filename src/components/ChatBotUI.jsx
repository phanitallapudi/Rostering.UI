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
      const response = await axios.get('https://rostering-ai.onrender.com/llm/ticket_query', {
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
    <div className={`fixed bottom-4 right-4 border rounded-lg bg-white shadow-lg ${isOpen ? 'w-85' : 'w-16 h-16'} z-50`}>
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
                {!msg.isUser && (
                  <svg className='w-5 h-5 mt-4 ml-0' fill="#8E24AA" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A.999.999 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1.004 1.004 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632zM7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2-.672 2-1.5 2S7 13.104 7 12zm8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0l-.004 2zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2 1.5.896 1.5 2-.672 2-1.5 2z"/></svg>
                )}
                <div className={`p-2 mt-2 max-w-[252px] rounded-lg ${msg.isUser ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-black mr-auto'}`}>
                  {msg.text}
                </div>
                {msg.isUser && (
                  <svg className='w-5 h-5 mt-4 ml--0' fill="#8E24AA" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 9.25c-2.27 0-2.73-3.44-2.73-3.44C7 4.02 7.82 2 9.97 2c2.16 0 2.98 2.02 2.71 3.81 0 0-.41 3.44-2.68 3.44zm0 2.57L12.72 10c2.39 0 4.52 2.33 4.52 4.53v2.49s-3.65 1.13-7.24 1.13c-3.65 0-7.24-1.13-7.24-1.13v-2.49c0-2.25 1.94-4.48 4.47-4.48z"/></svg>
                )}
              </div>
            ))}
            {isLoading && ( // Show loader if isLoading is true
              <div className="flex justify-start">
                <div className="loader p-2 mt-1 flex flex-row gap-[2px] rounded-lg max-w-xs bg-gray-200 text-black mr-auto">
                  <div className='h-3 w-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                  <div className='h-3 w-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                  <div className='h-3 w-3 bg-gray-500 rounded-full animate-bounce'></div>
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
