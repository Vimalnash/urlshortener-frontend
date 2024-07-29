import { PageHeader } from "../Components/PageHeader";
import { useFormik } from "formik";
import { urlShortenSchema } from "../Schemas/urlshorten";
import { getToken, isAdminLoggedIn, isUserLoggedIn } from "../helper/auth";
import { useState } from "react";
import { baseurl, userurl } from "../helper/backendurls";


// URL Shortener Creation Page
export function LandingPage(){
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);

    const shortBaseUrl = 'http://localhost:5173'

    const initVal = {
        longUrl: "",
        shortname: "",
    };

    const {
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        errors
    } = useFormik(
        {
            initialValues: initVal,
            validationSchema: urlShortenSchema,
            onSubmit: (values, {resetForm}) => {
                setLoadingMessage(true);
                handleURLShort(values);
                setTimeout(() => {
                    resetForm({values: ""});
                },500)
            }
        }
    )

    // ShortUrls Data saving based on user token
    function handleURLShort(shortenPayload) {
        const shortUrlPayload = {
            ...shortenPayload,
            shortUrl: `${shortBaseUrl}/${values.shortname}`
        };

        fetch(`${baseurl}/${userurl}/shortname/${values.shortname}`, {
            method: "POST",
            body: JSON.stringify(shortUrlPayload),
            headers: {
                "Content-Type" : "application/json",
                "x-auth-token" : getToken()
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.error) {
                setLoadingMessage(false);
                setSuccessMessage("");
                setFailureMessage(data.error);
                setTimeout(() => {
                    setFailureMessage("");
                },4000)
            } else {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setFailureMessage("");
                    setSuccessMessage(data.message);
                },1000)
                setTimeout(() => {
                    location.reload();
                },2000);
            }
        })
    }

    return (
        <>
            <PageHeader>Welcome to Url Shortener</PageHeader>
            <form className="m-2 p-2 flex flex-col" onSubmit={handleSubmit}>
                <div className="mb-2 min-w-28 flex flex-col">
                    <label for="longUrl">Input Your LongURL</label>
                    <input
                        type="text"
                        className="min-w-full border-2 border-rose-300"
                        id="longUrl"
                        name="longUrl"
                        value={values.longUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div>
                        {
                            touched.longUrl && errors.longUrl ?
                            (<div className="p-2 text-error">{errors.longUrl}</div>)
                            :
                            ("")
                        }
                    </div>
                </div>
                <div className="mb-2 flex">
                    <div className="flex flex-col gap-2">
                        <label for="shortname">Input Your ShortName</label>
                        <div className="flex flex-wrap gap-1">
                            <label for="shortname">{`${shortBaseUrl}`}/</label>
                            <input
                                type="text"
                                className="border-2 border-rose-300"
                                id="shortname"
                                name="shortname"
                                value={values.shortname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div>
                            {
                                touched.shortname && errors.shortname ?
                                (<div className="p-2 text-error">{errors.shortname}</div>)
                                :
                                ("")
                            }
                        </div>
                        <label for="shortname">e.g: Short-URL -&gt; {`${shortBaseUrl}`}/"yourshortname"</label>
                    </div>
                </div>

                {
                    isUserLoggedIn() || isAdminLoggedIn() ? 
                    (
                        <>
                        <button className="btn m-2" type="submit">Save</button>
                        {
                            loadingMessage ? (
                                <>
                                    <h4 className="m-2 text-error">
                                        Saving Please Wait
                                    </h4>
                                    <span className="m-2 text-error loading loading-dots loading-md"></span>
                                </>
                            ) : ("")
                        }
                        {successMessage ? (<h4 className="m-2 text-success">{successMessage}</h4>):("")}
                        {failureMessage ? (<h4 className="m-2 text-error">{failureMessage}</h4>):("")}
                        </>
                    )
                    :
                    (
                        <>
                        <button disabled className="btn m-2" type="submit">Save</button>
                        <div className="skeleton text-xl text-center text-rose-500">-&gt; Free Signup/Login - To Create Your Own Short URL</div>
                        </>
                    )
                }
            </form>
        </>
    )
};
