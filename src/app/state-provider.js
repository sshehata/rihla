'use client'

// Create the context
import {createContext, useContext, useEffect, useState} from "react";
import {getListings, addListing as stateAddListing} from "@/app/api/state";

const GlobalContext = createContext();

// Create a provider component
export const GlobalContextProvider = ({ children }) => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        setListings(getListings())
    }, []);

    const addListing = (item) => {
        stateAddListing(item)
        setListings((prevListings) => [...prevListings, item]);
    };

    return (
        <GlobalContext.Provider value={{ listings, addListing }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Create a custom hook for easy access to the context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
