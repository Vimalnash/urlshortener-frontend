import { createContext, useContext, useEffect, useState } from "react";

const DashboardCtx = createContext(null);

export function DashboardContext({children}) {
    const [ currentDate, setCurrentDate ] = useState("");
    useEffect(() => {
        setCurrentDate(new Date().toJSON().slice(0, 10));
    },[])
    const [ searchShortName, setSearchShortName ] = useState("");
    const [ createdFromDate, setCreatedFromDate ] = useState("");
    const [ createdToDate, setCreatedToDate ] = useState(currentDate);

    return (
        <DashboardCtx.Provider value={{
            searchShortName, setSearchShortName,
            createdFromDate, setCreatedFromDate,
            createdToDate, setCreatedToDate,
            currentDate, setCurrentDate
        }}>
            {children}
        </DashboardCtx.Provider>
    )
}

export function useDashBoardContext(){
    return useContext(DashboardCtx)
}
