import { PageHeader } from "../Components/PageHeader";
import { useFormik } from "formik";
import { newpasswordSchema } from "../Schemas/newpassword";
import { handleNewPasswordPayload } from "../helper/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

// New Password setting Page
export function NewPasswordSetPage() {
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);

    const location = useLocation();
    const passwordResetToken = new URLSearchParams(location.search).get("auth")

    const initVal = {
        password: "",
        confirmPassword: ""
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
            validationSchema: newpasswordSchema,
            onSubmit: (values, {resetForm}) => {
                setLoadingMessage(true);
                setTimeout(() => {
                    handleNewPassword(values);
                    resetForm({values: ""});
                },2000)
            }
        }
    )

    // New User Password Payload handling
    function handleNewPassword(newPasswordPayload) {
        handleNewPasswordPayload(newPasswordPayload, passwordResetToken)
        .then((data) => {
            if (data.error) {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setSuccessMessage("");
                    setFailureMessage(data.error)
                },1000)
                setTimeout(() => {
                    setFailureMessage("")
                },3000)
            } else {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setFailureMessage("");
                    setSuccessMessage(data.message);
                },1000)
                setTimeout(() => {
                    navigate("/login")
                },3000)
            }
        })
    }

    return (
        <>
            <PageHeader>Login</PageHeader>
            <form className="m-2 p-2 flex flex-col items-center" onSubmit={handleSubmit}>
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
                <div className="mb-2 flex flex-col">
                    <label for="confirmPassword">ConfirmPassword</label>
                    <input
                        type="password"
                        className="border-2 border-rose-300"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div>
                        {
                            touched.confirmPassword && errors.confirmPassword ?
                            (<div className="p-2 text-error">{errors.confirmPassword}</div>)
                            :
                            ("")
                        }
                    </div>
                </div>
                <button className="btn" type="submit">SetNewPassword</button>
                {
                    loadingMessage && (
                        <>
                            <h4 className="m-2 text-error">Processing Please Wait</h4>
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

