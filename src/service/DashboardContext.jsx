import React from 'react';
import {useState, useContext, createContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
// eslint-disable-next-line
const ResultContext = createContext();

export const ResultContextProvider = ({children}) => {
    const [ticket, setTicketData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetchTicketInformationWithAuthorization();
            setTicketData(data);
            console.log(data);
          } catch (error) {
            console.error("Error fetching ticket information:", error);
          }
        };
    
        fetchData();
      }, []);
    

    
    return (
        <ResultContext.Provider value={{ticket}}>
            {children}
        </ResultContext.Provider>
    );
}

export const useResultContext = () => useContext(ResultContext);
