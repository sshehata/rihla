'use client'

import {createContext, useContext, useEffect, useState} from "react";
import {getCollectibles, addCollectible as stateAddCollectible, getArtists} from "@/app/api/state";

const GlobalContext = createContext();

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

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
