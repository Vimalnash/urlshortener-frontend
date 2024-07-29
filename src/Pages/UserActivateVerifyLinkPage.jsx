import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleUserActivation } from "../helper/auth";

// User Activation Link Verify page
export function UserActivateVerifyLinkPage() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(true);

    const location = useLocation();
    const activateToken = new URLSearchParams(location.search).get("activate")

    useEffect(() => {
        handleUserActivation(activateToken)
        .then((data) => {
            console.log(data);
            if (data.error) {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setSuccessMessage("");
                    setFailureMessage(data.error);
                },3000)
            } else {
                setLoadingMessage(false);
                setFailureMessage("");
                setSuccessMessage(data.message);
                setTimeout(() => {
                    navigate("/login");
                },3000)
            }
        })
    }, []);

    return (
        <>
            {        
                loadingMessage && (
                    <>
                        <h3 className="flex justify-center gap-2 m-2 text-center text-success">
                            <span>Activating Please Wait</span>
                            <span className="loading loading-dots loading-md"></span>
                        </h3>
                    </>
                )
            }
            {
                successMessage ?
                (
                <h3 className="flex justify-center gap-2 m-2 text-center text-success">
                    {successMessage}, 
                    You Will be Redirected to Login Page
                    <span className="loading loading-dots loading-md"></span>
                </h3>
                )
                :
                ("")
            }
            {
                failureMessage?
                (<h3 className="m-2 text-center text-error">{failureMessage}</h3>)
                :
                ("")
            }
            
        </>
    )
};

