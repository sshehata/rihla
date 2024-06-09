'use client'

// Create the context
import {createContext, useContext, useEffect, useState} from "react";
import {getCollectibles, addCollectible as stateAddCollectible, getArtists} from "@/app/api/state";

const GlobalContext = createContext();

// Create a provider component
export const GlobalContextProvider = ({ children }) => {
    const [collectibles, setCollectibles] = useState([]);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        setCollectibles(getCollectibles())
    }, []);

    useEffect(() => {
        setArtists(getArtists())
    }, []);

    const addCollectible= (item) => {
        console.log(item)
        stateAddCollectible(item)
        setCollectibles((prevListings) => [...prevListings, item]);
    };

    return (
        <GlobalContext.Provider value={{ collectibles, addCollectible, artists}}>
            {children}
        </GlobalContext.Provider>
    );
};

// Create a custom hook for easy access to the context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
