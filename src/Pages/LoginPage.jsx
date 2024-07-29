import { PageHeader } from "../Components/PageHeader";
import { useFormik } from "formik";
import { loginSchema } from "../Schemas/login";
import { handleLoginPayload } from "../helper/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// User Login Page
export function LoginPage() {
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);

    const initVal = {
        email: "",
        password: ""
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
            validationSchema: loginSchema,
            onSubmit: (values, {resetForm}) => {
                setLoadingMessage(true);
                handleLogin(values);
                setTimeout(() => {
                    resetForm({values: ""});
                },500)

            }
        }
    )

    // Handle User Credential Payload
    function handleLogin(loginPayload) {
        handleLoginPayload(loginPayload)
        .then((data) => {
            if(data.error) {
                setLoadingMessage(false);
                setSuccessMessage("");
                setFailureMessage(data.error)
                setTimeout(() => {
                    setFailureMessage("")
                },3000)
            } else {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setTimeout(() => {
                    setLoadingMessage(false);
                    setFailureMessage("");
                    setSuccessMessage(data.message);
                },1000)
                setTimeout(() => {
                    navigate("/")
                    location.reload();
                },2000)
            }
        })
    }

    return (
        <>
            <PageHeader>Login</PageHeader>
            <form className="m-2 p-2 flex flex-col items-center" onSubmit={handleSubmit}>
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
                <button className="btn" type="submit">Login</button>
                <button type="button" onClick={() => navigate("/resetpassword")}>ForgotPassword?</button>
                {
                    loadingMessage && (
                        <>
                            <h4 className="m-2 text-error">
                                Logging In
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

