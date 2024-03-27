import React, { useEffect, useState } from "react";
import "../../css/star.css";
import BarChart from "../../charts/BarChart01";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

import {getAllTechnicians} from "../../service/allTechnicians";

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

function DashboardCard04() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 12.95589, lng: 77.72162 });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const data = await getAllTechnicians();
        setTechnicians(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchTechnicians();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-screen">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Technician Locations
        </h2>
      </header>
      <div style={{ width: "100%", overflow: "hidden" }}>
        {isLoaded ? (
          <GoogleMap
            center={mapCenter}
            zoom={14}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: "100%", height: "90vh" }}
          >
            {technicians.map(
              ({ _id, name, current_location, skill_set, phoneno, rating }) => (
                <MarkerF
                  key={_id}
                  position={{
                    lat: current_location[0],
                    lng: current_location[1],
                  }}
                  onClick={() => handleActiveMarker(_id)}
                  // onClick={() => setActiveMarker(_id)}
                  icon={{
                    url: "https://cdn-icons-png.flaticon.com/512/6342/6342684.png",
                    scaledSize: { width: 50, height: 50 },
                  }}
                >
                  {activeMarker === _id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div className="w-auto h-auto">
                        <p className="text-xl font-semibold text-wrap">
                          {name}
                        </p>
                        <p className="text-sm capitalize">{skill_set}</p>
                        <p className="mt-1 text-sm">{phoneno}</p>
                        <p className="flex flex-row">
                          <RatingStars
                            className="flex flex-row w-full"
                            rating={rating}
                          />
                        </p>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              )
            )}
          </GoogleMap>
        ) : null}
      </div>
    </div>
  );
}

export default DashboardCard04;
