import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { nearestTech, assignManually, assignAutomatically } from "../service/allTechnicians";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { Toaster, toast } from "sonner";
import Swal from 'sweetalert2';
import { Button } from "@mui/material";
import fetchRoutePoints from "../service/routeService";
import AssignedMap from "../partials/customer/AssignedMap";
import ChatBotUI from "../components/ChatBotUI";


const starStyle = {
  width: "20px", // Adjust as needed
  height: "20px", // Adjust as needed
  fill: "#FFD700", // Adjust star color
  display: "flex",
};

const RatingStars = ({ rating }) => {
  // Convert rating to stars
  console.log(rating);
  const getStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={starStyle}
        >
          <path d="M12 2 L14.19 8.62 L20.5 9.27 L15.82 14.5 L17 20 L12 17.75 L7 20 L8.18 14.5 L3.5 9.27 L9.81 8.62 Z" />
        </svg>
      ); // Full star (Unicode character)
    }

    if (halfStar === 1) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={starStyle}
        >
          <path d="M12 2 L12 17.75 L7 20 L8.18 14.5 L3.5 9.27 L9.81 8.62 L12 2 Z" />
        </svg>
      ); // Half star (Unicode character)
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={i + fullStars + halfStar}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={starStyle}
        >
          <path
            d="M12 2 L14.19 8.62 L20.5 9.27 L15.82 14.5 L17 20 L12 17.75 L12 2"
            fill="none"
          />
        </svg>
      ); // Empty star (Unicode character)
    }

    return stars;
  };

  return <p className="flex">{getStars()}</p>;
};

const SingleTicket = () => {
  const { id } = useParams(); // Extracting the ID parameter from the URL
  const [ticket, setTicket] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 12.95589, lng: 77.72162 });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [user_location, setUserLocation] = useState('');
  const [tech_location, setTechnicianLocation] = useState('');
  const [arrayPoints, setArrayPoints] = useState(null);
  const [autoAssignTriggered, setAutoAssignTriggered] = useState(false);
  const [fetchrouteTrigger, setFetchRouteTrigger] = useState(false);
  //const accesstoken = localStorage.getItem('access_token');

  const accesstoken = localStorage.getItem("access_token");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  const handleAutoAssign = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to automatically assign this ticket.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, assign it!'
      });
  
      if (result.isConfirmed) {
        const loader = Swal.fire({
          title: 'Processing...',
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          }
        });
  
        const assignAutomaticallyCall = await assignAutomatically(ticket._id);
        loader.close();
  
        Swal.fire({
          icon: 'success',
          title: 'Done',
          showConfirmButton: false,
          timer: 2000 // Automatically close after 2 seconds
        });
  
        toast.success(assignAutomaticallyCall);
        setAutoAssignTriggered(true);
  
      } else {
        toast.error("Ticket auto-assignment cancelled by the admin.");
      }
    } catch (error) {
      console.error('Error assigning ticket:', error);
      toast.error("An error occurred while automatically assigning the ticket.");
    }
  };
  

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/tickets/get_single_ticket?_id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );
        setTicket(response.data);
        console.log("this is ticket data ", response.data);
        console.log(" assigned technician id", response.data.assigned_to._id);
        // console.log("user's location", response.data.location);
        const userLat = response.data.location[0];
        const userLong = response.data.location[1];

        const userLocation = `${userLat}, ${userLong}`;
        // console.log(userLat);
        // console.log(userLong);
        setUserLocation(userLocation);
        console.log("this is user location", `${user_location}`);
      } catch (error) {
        // console.error("Error fetching ticket:", error);
      }
    };

    // Check if id is not null before making the API call
    if (id !== null && id !== undefined && id !== "") {
      fetchTicket();
    }
  }, [id, autoAssignTriggered, fetchrouteTrigger]);


  useEffect(() => {
    const fetchNearestTechnician = async () => {
      try {
        // Assuming ticket.skill_set is the skill set value you want to use
        const nearestTechnician = await nearestTech(
          ticket.location[0],
          ticket.location[1],
          ticket.title
        );
        // console.log(ticket.skill_set);
        setTechnicians(nearestTechnician);
        console.log("this is the technician array ", nearestTechnician);
        const latitude = nearestTechnician[0].current_location[0];

        const longitude = nearestTechnician[0].current_location[1];
        const locationString = `${latitude}, ${longitude}`;
        setTechnicianLocation(locationString);
        console.log("this is tech location", `${tech_location}`);

      } catch (error) {
        console.error("Error fetching nearest technician:", error);
      }
    };

    if (ticket) {
      fetchNearestTechnician();
    }
  }, [ticket]);

  useEffect(() => {
    const fetchArray = async () => {
      try {
        const response = await fetchRoutePoints(user_location, tech_location);
        setArrayPoints(response);
        setFetchRouteTrigger(true);
        console.log("Response in singleTicket:", response);
      } catch (err) {
        console.log(err);
      }
    };

    if (user_location && tech_location) {
      fetchArray();
    }
  }, [user_location, tech_location]);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }, []);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  const handleSubmit = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to assign this ticket.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, assign it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Show loader while request is being processed
        const loader = Swal.fire({
          title: 'Processing...',
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          }
        });
  
        assignManually(selectedTechnician, id)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Ticket assigned successfully!',
              showConfirmButton: false,
              timer: 2000 // Automatically close after 2 seconds
            });
            loader.close(); // Close the loader once the request is complete
            toast.success(`Selected technician ID: ${selectedTechnician}`);
          })
          .catch((error) => {
            loader.close(); // Close the loader in case of error
            console.error('Error assigning ticket:', error);
            toast.error("An error occurred while assigning the ticket.");
          });
      } else {
        toast.error("Ticket assignment cancelled by the admin.");
      }
    });
  };
  

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto flex gap-20">
            {/* Welcome banner */}
            {/* <WelcomeBanner /> */}
            {/* Ticket Details */}
            <div className="border border-gray-200 dark:border-gray-700 rounded overflow-hidden mb-2 w-full sm:w-4/5 md:w-3/5">
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    Ticket View
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                    Details Informations About Tickets.
                  </p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600">
                  <dl>
                    {ticket && ( // Check if ticket is not null
                      <>
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-40 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Ticket ID
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            {ticket.uid}
                          </dd>
                        </div>
                        <div className="bg-white dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-40 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Title
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            {ticket.title}
                          </dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-40 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Description
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            {ticket.description}
                          </dd>
                        </div>
                        <div className="bg-white dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-40 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Status
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            {ticket.status}
                          </dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-2 py-5 sm:grid sm:grid-cols-3 sm:gap-40 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Assigned To
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            {ticket.assigned_to
                              ? ticket.assigned_to.name
                              : "This ticket is yet to be assigned"}
                          </dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-2 py-5 sm:grid sm:grid-cols-3 sm:gap-40 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Assign Manually
                          </dt>
                          <div className="relative mt-1 text-sm capitalize text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                            <select
                              className="block w-2/3 border border-gray-300 rounded px-3 py-1 mr-2"
                              value={selectedTechnician}
                              onChange={(e) => {
                                setSelectedTechnician(e.target.value);
                                console.log(
                                  "this is technician id",
                                  e.target.value
                                );
                              }}
                            >
                              <option value="">Select</option>
                              {technicians.map(({ _id, name, day_schedule }) => (
                                <option
                                  key={_id}
                                  value={_id}
                                  disabled={day_schedule === "booked"}
                                  style={{
                                    backgroundColor: day_schedule === "free" ? "lightgreen" : "lightgrey",
                                    color: day_schedule === "booked" ? "gray" : "black",
                                  }}
                                >
                                  {name}
                                </option>
                              ))}
                            </select>
                            {ticket && (
                              <button
                                onClick={handleSubmit}
                                className="h-3/4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded" // Set height to match select dropdown height
                              >
                                Submit
                              </button>
                            )}
                            {ticket && ticket.status == 'open' && (
                              <button
                                onClick={handleAutoAssign}
                                className="h-3/4 bg-transparent whitespace-nowrap hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-5 ml-2 border border-blue-500 hover:border-transparent rounded" // Set height to match select dropdown height
                              >
                                Auto Assign
                              </button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </dl>
                </div>
              </div>
            </div>
            <div className="rounded overflow-hidden mb-2">
              <div className="bg-white dark:bg-gray-800 min-w-[400px] shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    Roster Details
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                    Details Informations About Assistant
                  </p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600">
                  <dl>
                    {/* Check if both ticket and assigned_to are not null */}
                    {ticket && ticket.assigned_to ? (
                      <>
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-24 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            {ticket.assigned_to.name}
                          </dd>
                        </div>
                        <div className="bg-white dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 gap-16 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Phone No
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            {ticket.assigned_to.phoneno}
                          </dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-24 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Rating
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            {ticket.assigned_to.rating + '/5'}
                          </dd>
                        </div>
                        <div className="bg-white dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-24 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Skill Set
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            {ticket.assigned_to.skill_set}
                          </dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-2 py-5 sm:grid sm:grid-cols-3 sm:gap-24 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Experience
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            {ticket.assigned_to.experience_years + " years"}
                          </dd>
                        </div>
                      </>
                    ) : (
                      // Render null values if either ticket or assigned_to is null
                      <>
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-24 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            No Technician Assigned
                          </dd>
                        </div>
                        <div className="bg-white dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 gap-24 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Phone No
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            null
                          </dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-24 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Rating
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            null
                          </dd>
                        </div>
                        <div className="bg-white dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-24 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Skill Set
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            null
                          </dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-2 py-5 sm:grid sm:grid-cols-3 sm:gap-24 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Experience
                          </dt>
                          <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                            null
                          </dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>
              </div>
            </div>

            {/* Assuming ticket details rendering logic is here */}
          </div>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex flex-col col-span-full sm:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-screen">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  Nearest Technicians Locations
                </h2>
              </header>
              <div>
                {isLoaded && (
                  <GoogleMap
                    center={mapCenter}
                    zoom={14}
                    onClick={() => setActiveMarker(null)}
                    mapContainerStyle={{ width: "100%", height: "90vh" }}
                  >
                    {technicians.map(
                      ({
                        _id,
                        name,
                        current_location,
                        skill_set,
                        phoneno,
                        rating,
                      }) => (
                        <MarkerF
                          key={_id}
                          position={{
                            lat: current_location[0],
                            lng: current_location[1],
                          }}
                          onClick={() => handleActiveMarker(_id)}
                          icon={{
                            url: "https://cdn-icons-png.flaticon.com/512/6342/6342684.png",
                            scaledSize: { width: 50, height: 50 },
                          }}
                        >
                          {activeMarker === _id && (
                            <InfoWindowF
                              onCloseClick={() => setActiveMarker(null)}
                            >
                              <div className="w-auto h-auto">
                                <p className="text-xl font-semibold text-wrap">
                                  {name}
                                </p>
                                <p className="text-sm capitalize">
                                  {skill_set}
                                </p>
                                <p className="mt-1 text-sm">{phoneno}</p>
                                <p className="flex flex-row">
                                  <RatingStars
                                    className="flex flex-row w-full"
                                    rating={rating}
                                  />
                                </p>
                              </div>
                            </InfoWindowF>
                          )}
                        </MarkerF>
                      )
                    )}
                  </GoogleMap>
                )}
              </div>
              {arrayPoints && <div className="mt-10 flex flex-col col-span-full sm:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-screen">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                  <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                    Directions To The User
                  </h2>
                </header>
                <div>
                  {arrayPoints ? <AssignedMap ticket={ticket} routePoints={arrayPoints} /> : ''}
                </div>
              </div>}
            </div>
          </div>
          {/* <ChatBotUI /> */}
        </main>
      </div>
    </div>
  );
};

export default SingleTicket;
