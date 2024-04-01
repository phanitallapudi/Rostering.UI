import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Toaster, toast } from 'sonner'

const Login = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

 useEffect(() => {
  const token = localStorage.getItem('access_token');
  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);


 const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    setErrorMessage(''); // Clear any previous error message

    setLoading(true);

    try {
      const response = await axios.post(
        'https://rostering-ai.onrender.com/login',
        new URLSearchParams({
          grant_type: 'password',
          username: username,
          password: password,
          scope: 'email',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log(data); // Handle the response data as needed
        // For example, you might want to save the token to local storage or context
        localStorage.setItem('access_token', data.access_token);
        toast.success('You are successfully logged In');
        navigate("/dashboard")
        setLoading(false);
      } else {
        console.error('Login failed');
        // Handle login failure, e.g., show an error message
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed', error);
      // Handle login failure, e.g., show an error message
      setErrorMessage('Login failed. Please check your credentials.');
    }
 };

 return (
  <div className="dark:bg-gray-800">
     <Toaster />
     <div className="font-[sans-serif] text-[#333] dark:text-gray-200">
       <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
         <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
           <div className="max-md:text-center">
             <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] dark:text-gray-100">
               Seamless Login for Exclusive Access
             </h2>
           </div>
           <form className="space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full" onSubmit={handleLogin}>
             <h3 className="text-3xl font-extrabold mb-8 max-md:text-center dark:text-gray-100">
               Sign in
             </h3>
             <div>
               <input
                name="email"
                type="text"
                autocomplete="email"
                required
                className="bg-gray-100 dark:bg-gray-700 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 dark:outline-blue-400"
                placeholder="Email address"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
               />
             </div>
             <div>
               <input
                name="password"
                type="password"
                autocomplete="current-password"
                required
                className="bg-gray-100 dark:bg-gray-700 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 dark:outline-blue-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
               />
             </div>
             <div className="flex items-center justify-between">
               <div className="text-sm">
                <a
                  href="javascript:void(0);"
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                 >
                  Forgot your password?
                </a>
               </div>
             </div>
             {errorMessage && (
               <div className="text-red-500 mt-2 dark:text-red-400">
                {errorMessage}
               </div>
             )}
             <div className="!mt-10">
               <button
                type="submit" // Change this to submit the form
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:bg-blue-800"
               >
               {loading ? <Loader/> : `Log in`}
               </button>
             </div>
           </form>
         </div>
       </div>
     </div>
  </div>
 );
 
};

export default Login;