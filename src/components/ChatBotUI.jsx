import React, { useState } from "react";

const ChatBotUI = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Function to toggle the chat div
    const toggleChat = () => {
       setIsChatOpen(!isChatOpen);
    };


 return (
    <div>
      <button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
        onClick={toggleChat}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle"
        >
          <path
            d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
            className="border-gray-200"
          ></path>
        </svg>
      </button>

      {isChatOpen && (
        <div
          style={{ boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)" }}
          className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]"
        >
          <div className="flex flex-col space-y-1.5 pb-6">
            <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
            <p className="text-sm text-[#6b7280] leading-3">
              Powered by Mendable and Vercel
            </p>
          </div>

          <div className="pr-4 h-[474px]" style={{ minWidth: "100%", display: "table" }}>
            {/* Chat messages and input form */}
          </div>

          <div className="flex items-center pt-0">
            <form className="flex items-center justify-center w-full space-x-2">
              <input
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Type your message"
                value=""
              />
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
 );
};

export default ChatBotUI;
