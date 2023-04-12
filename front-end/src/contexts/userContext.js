import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
    const [ userData, setUserData ] = useState();
    const [ projectSelectedData, setProjectSelectedData ] = useState({});
    const [ projectsList, setProjectsList ] = useState([]);
    const [ sprintsList, setSprintsList  ] = useState([{}]);
    const [loading, setLoading] = useState("loading");
    const [selectedSprint, setSelectedSprint] = useState(0);


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
                loading,
                setLoading,
                selectedSprint,
                setSelectedSprint,
            }}
        >
            {children}
        </UserContext.Provider>
    )
};