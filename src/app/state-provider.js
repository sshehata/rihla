// state-provider.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCollectibles, addCollectible, transferOwnership as transferOwnershipFn, getUserCollectibles as getUserCollectiblesFn } from '@/app/api/state';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [collectibles, setCollectibles] = useState([]);

    useEffect(() => {
        setCollectibles(getCollectibles());
    }, []);

    const handleTransferOwnership = (collectibleId, fromUser, toUser) => {
        transferOwnershipFn(collectibleId, fromUser, toUser);
        setCollectibles(getCollectibles());
    };

    const getUserCollectibles = (username) => getUserCollectiblesFn(username);

    return (
        <GlobalContext.Provider value={{ collectibles, addCollectible, handleTransferOwnership, getUserCollectibles }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
