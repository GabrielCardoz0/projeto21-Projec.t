import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
    const [ userData, setUserData ] = useState();
    const [ projectSelectedData, setProjectSelectedData ] = useState({});
    const [ projectsList, setProjectsList ] = useState(["eba"]);
    return(
        <UserContext.Provider
            value={{
                userData,
                setUserData,
                projectSelectedData,
                setProjectSelectedData,
                projectsList,
                setProjectsList,
            }}
        >
            {children}
        </UserContext.Provider>
    )
};