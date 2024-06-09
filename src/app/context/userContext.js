import { createContext, useContext, useState } from 'react';
import { getUser } from '../api/state';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        const user = getUser(username);
        if (user && user.password === password) {
            setUser(user);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
