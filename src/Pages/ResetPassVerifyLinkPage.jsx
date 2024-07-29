import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleResetVerifyLink } from "../helper/auth";

// Reset Password Link click process Pages
export function ResetPassVerifyLinkPage() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(true);

    const location = useLocation();
    const passwordResetToken = new URLSearchParams(location.search).get("auth")

    useEffect(() => {
        handleResetVerifyLink(passwordResetToken)
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
                    navigate(`/newpassword?reset=${passwordResetToken}`);
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
                        <span>Processing Please Wait</span>
                        <span className="loading loading-dots loading-md"></span>
                    </h3>
                    </>
                )
            }
            {
                successMessage ?
                (
                    <>
                    <h3 className="flex justify-center gap-2 m-2 text-center text-success"> 
                        <span>You Will be Redirected to NewPassword Setting</span>
                        <span className="loading loading-dots loading-md"></span>
                    </h3>
                    </>
                )
                :
                ("")
            }
            {
                failureMessage?
                (<h3  className="m-2 text-center text-error">{failureMessage}</h3>)
                :
                ("")
            }
            
        </>
    )
};

