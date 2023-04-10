import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
    const [ userData, setUserData ] = useState();
    const [ projectSelectedData, setProjectSelectedData ] = useState({});
    const [ projectsList, setProjectsList ] = useState([]);
    const [ sprintsList, setSprintsList  ] = useState([{}]);


    return(
        <UserContext.Provider
            value={{
                userData,
                setUserData,
                projectSelectedData,
                setProjectSelectedData,
                projectsList,
                setProjectsList,
                sprintsList,
                setSprintsList,
            }}
        >
            {children}
        </UserContext.Provider>
    )
};