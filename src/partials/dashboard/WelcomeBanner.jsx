// import React from 'react';

// function WelcomeBanner() {
//   return (
//     <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
//       {/* Background illustration */}
     
//       {/* Content */}
//       <div className="relative">
//         <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">Good Afternoon, Admin</h1>
//       </div>
//     </div>
//   );
// }

// export default WelcomeBanner;


import React from 'react';

function WelcomeBanner() {
 // Get the current hour
 const currentHour = new Date().getHours();

 // Determine the greeting based on the current hour
 let greeting;
 if (currentHour < 12) {
    greeting = 'Good Morning';
 } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
 } else {
    greeting = 'Good Evening';
 }

 return (
    <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Background illustration */}
     
      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
          {greeting}, Admin
        </h1>
      </div>
    </div>
 );
}

export default WelcomeBanner;
