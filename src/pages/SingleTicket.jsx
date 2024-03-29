import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { nearestTech, assignManually } from "../service/allTechnicians";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { Toaster, toast } from "sonner";
import { Button } from "@mui/material";
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
  //const accesstoken = localStorage.getItem('access_token');

  const accesstoken = localStorage.getItem("access_token");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

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
        console.log(response.data);
        console.log(response.data.assigned_to._id);
      } catch (error) {
        // console.error("Error fetching ticket:", error);
      }
    };

    // Check if id is not null before making the API call
    if (id !== null && id !== undefined && id !== "") {
      fetchTicket();
    }
  }, [id]);

  useEffect(() => {
    const fetchNearestTechnician = async () => {
      try {
        // Assuming ticket.skill_set is the skill set value you want to use
        const nearestTechnician = await nearestTech(
          ticket.location[0],
          ticket.location[1],
          ticket.title
        );
        console.log(ticket.skill_set);
        setTechnicians(nearestTechnician);
        console.log(nearestTechnician);
      } catch (error) {
        console.error("Error fetching nearest technician:", error);
      }
    };

    if (ticket) {
      fetchNearestTechnician();
    }
  }, [ticket]);

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
    const userConfirmation = window.confirm(
      "Are you sure you want to assign this ticket?"
    );

    if (userConfirmation) {
      toast.success("Selected technician ID:", selectedTechnician);
      assignManually(selectedTechnician, id);
    } else {
      // Optionally, handle the case where the user cancels the action
      toast.error("Ticket assignment cancelled by the admin.");
    }
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
                          <div className="relative mt-1 text-sm capitalize text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-1">
                            <select
                              className="block w-full border border-gray-300 dark:border-gray-500 rounded px-3 py-1 dark:bg-gray-600 dark:text-gray-100"
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
                              {technicians.map(
                                ({
                                  _id,
                                  name,
                                  day_schedule, // Add day_schedule to technician object destructuring
                                }) => (
                                  <option
                                    key={_id}
                                    value={_id}
                                    disabled={day_schedule === "booked"} // Disable option if day_schedule is "booked"
                                    style={{
                                      backgroundColor:
                                        day_schedule === "free"
                                          ? "lightgreen"
                                          : "lightgrey", // Set background color
                                      color:
                                        day_schedule === "booked"
                                          ? "gray"
                                          : "black", // Set text color
                                    }}
                                  >
                                    {name}
                                  </option>
                                )
                              )}
                            </select>
                            {ticket && (
                              <button
                                onClick={handleSubmit}
                                className="mt-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-blue-700 dark:hover:text-white"
                              >
                                Submit
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
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-24 sm:px-6">
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
            </div>
          </div>
          <ChatBotUI />
        </main>
      </div>
    </div>
  );
};

export default SingleTicket;
