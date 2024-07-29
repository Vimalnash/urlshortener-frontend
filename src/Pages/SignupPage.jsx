import { PageHeader } from "../Components/PageHeader";
import {useFormik} from "formik";
import { signupSchema } from "../Schemas/signup";
import { handleSignupPayload } from "../helper/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// New User Signup Page
export function SignupPage() {
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);

    const initvalue = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors,
    } = useFormik(
        {
            initialValues: initvalue,
            validationSchema: signupSchema,
            onSubmit: (values,  {resetForm}) => {
                setLoadingMessage(true);
                setTimeout(() => {
                    handleSignup(values);
                    resetForm({values: ""});
                },2000)
            }
        }
    )

    // Handle signup payload
    function handleSignup(signupPayload) {
        handleSignupPayload(signupPayload)
        .then((data) => {
            if(data.error) {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setSuccessMessage("");
                    setFailureMessage(data.error)
                },1000)
                setTimeout(() => {
                    setFailureMessage("");
                },3000)
            } else {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setFailureMessage("");
                    setSuccessMessage(data.message);
                },1000)
            }
        })
    };

    
    return (
        <>
            <PageHeader>Signup</PageHeader>
            <form className="m-2 p-2 flex flex-col items-center" onSubmit={handleSubmit}>
                <div className="mb-2 flex flex-col">
                    <label for="firstName">FirstName</label>
                    <input
                        type="text"
                        className="border-2 border-rose-300"
                        id="firstName"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div>
                        {
                            touched.firstName && errors.firstName ?
                            (<div className="p-2 text-error">{errors.firstName}</div>)
                            :
                            ("")
                        }
                    </div>
                </div>
                <div className="mb-2 flex flex-col">
                    <label for="lastName">LastName</label>
                    <input
                        type="text"
                        className="border-2 border-rose-300"
                        id="lastName"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div>
                        {
                            touched.lastName && errors.lastName ?
                            (<div className="p-2 text-error">{errors.lastName}</div>)
                            :
                            ("")
                        }
                    </div>
                </div>
                <div className="mb-2 flex flex-col">
                    <label for="username">UserName</label>
                    <input
                        type="text"
                        className="border-2 border-rose-300"
                        id="userName"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div>
                        {
                            touched.userName && errors.userName ?
                            (<div className="p-2 text-error">{errors.userName}</div>)
                            :
                            ("")
                        }
                    </div>
                </div>
                <div className="mb-2 flex flex-col">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        className="border-2 border-rose-300"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div>
                        {
                            touched.email && errors.email ?
                            (<div className="p-2 text-error">{errors.email}</div>)
                            :
                            ("")
                        }
                    </div>
                </div>
                <div className="mb-2 flex flex-col">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        className="border-2 border-rose-300"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div>
                        {
                            touched.password && errors.password ?
                            (<div className="p-2 text-error">{errors.password}</div>)
                            :
                            ("")
                        }
                    </div>
                </div>
                <button className="btn" type="submit">Signup</button>
                {
                    loadingMessage && (
                        <>
                            <h4 className="m-2 text-error">
                                Processing Please Wait
                            </h4>
                            <span className="m-2 text-error loading loading-dots loading-md"></span>
                        </>
                    )
                }
                {successMessage ? (<h4 className="m-2 text-success">{successMessage}</h4>):("")}
                {failureMessage ? (<h4 className="m-2 text-error">{failureMessage}</h4>):("")}
            </form>
        </>
    )
};

