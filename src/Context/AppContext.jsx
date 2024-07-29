import { createContext, useContext, useEffect, useState } from "react";
import { adminurl, baseurl, userurl } from "../helper/backendurls";
import { getToken, isAdminLoggedIn, isUserLoggedIn } from "../helper/auth";

// Creating New Context
const AppCtx = createContext(null);

// Applying Context
export function AppContext({children}) {
    const [theme, setTheme] = useState("cupcake");
    const [loggedInUser, setLoggedInUser] = useState({});
    const [urlList, setUrlList] = useState([]);
    const [urlCount, setUrlCount] = useState({});

    // getting is normal user logged in
    const userAccess = isUserLoggedIn();
    if (userAccess) {
        // checking, getting and setting logged in user
        useEffect(() => {
            setLoggedInUser(JSON.parse(localStorage.getItem("user")));
        },[]);
    
        // Getting Shorturls list for the user
        useEffect(() => {
            fetch(`${baseurl}/${userurl}/shorturllist`, {
                method: "GET",
                headers: {
                    "x-auth-token": getToken()
                }
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setUrlList(data.data);
                }
            })
        },[]);

        // getting shorturlcounts created by user for the dashboard
        useEffect(() => {
            fetch(`${baseurl}/${userurl}/dashboard`, {
                method: "GET",
                headers: {
                    "x-auth-token": getToken()
                }
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setUrlCount(data.shortUrlCount);
                }
            })
        }, [])
    };

    // getting is admin logged in
    const adminAccess = isAdminLoggedIn();
    if (adminAccess) {
        // Checking, getting and setting the loggedin username
        useEffect(() => {
            setLoggedInUser(JSON.parse(localStorage.getItem("user")));
        },[]);

        // Getting ShortUrls List Overall for the admin
        useEffect(() => {
            fetch(`${baseurl}/${adminurl}/shorturllist`, {
                method: "GET",
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setUrlList(data.data);
                }
            })
        },[]);

        // Getting ShortUrls Counts overall by admin Today, ThisMonth, Total 
        useEffect(() => {
            fetch(`${baseurl}/${adminurl}/dashboard`, {
                method: "GET",
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.error) {
                    console.log(data.error);
                } else {
                    setUrlCount(data.shortUrlCount);
                }
            })
        }, [])
    };

    const [ currentDate, setCurrentDate ] = useState("");
    useEffect(() => {
        setCurrentDate(new Date().toJSON().slice(0, 10));
    },[])
    const [ searchShortName, setSearchShortName ] = useState("");
    const [ createdFromDate, setCreatedFromDate ] = useState("");
    const [ createdToDate, setCreatedToDate ] = useState(currentDate);

    return (
        <AppCtx.Provider value={{
            theme, setTheme,
            loggedInUser, setLoggedInUser,
            urlList, setUrlList,
            urlCount, setUrlCount,

            searchShortName, setSearchShortName,
            createdFromDate, setCreatedFromDate,
            createdToDate, setCreatedToDate,
            currentDate, setCurrentDate
        }}>
            {children}
        </AppCtx.Provider>
    )
};

// UseContext Function to get the context vairables
export function useAppContext() {
    return useContext(AppCtx)
}