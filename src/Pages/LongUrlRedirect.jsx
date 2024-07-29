import { useEffect, useState } from "react";
import { baseurl, publicurl } from "../helper/backendurls";
import { useNavigate, useParams } from "react-router-dom";


// When ShortUrl clicked, it redirects to Long URL
export function LongUrlRedirect() {
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(true);

    const {shortname} = useParams();

    useEffect(() => {
        fetch(`${baseurl}/${publicurl}/${shortname}`, {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
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
                    window.open(data.data.longUrl);
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
                            <span>Searching Please Wait</span>
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
                    You Will be Redirected to OriginalLink
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

