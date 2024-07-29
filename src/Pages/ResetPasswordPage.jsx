import { PageHeader } from "../Components/PageHeader";
import { useFormik } from "formik";
import { useState } from "react";
import { handleResetPassPayload } from "../helper/auth";
import { resetpasswordSchema } from "../Schemas/resetpassword";

// Reset Password Page - Getting Email from the user and send reset link to mail
export function ResetPasswordPage() {
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);

    const initVal = {
        email: ""
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
            validationSchema: resetpasswordSchema,
            onSubmit: (values, {resetForm}) => {
                setLoadingMessage(true);
                handleResetPass(values);
                resetForm({values: ""});
            }
        }
    )

    // Reset Password Mail getting from user and sending to backend
    function handleResetPass(resetPasswordPayload) {
        handleResetPassPayload(resetPasswordPayload)
        .then((data) => {
            if (data.error) {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setSuccessMessage("");
                    setFailureMessage(data.error)
                },1000)
            } else {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setFailureMessage("");
                    setSuccessMessage(data.message);
                },1000)
            }
        })
    }

    return (
        <>
            <PageHeader>ResetPassword</PageHeader>
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
                <button className="btn" type="submit">SendEmail</button>
                {
                    loadingMessage && (
                        <h4 className="m-2 text-error">Processing Please Wait...</h4>
                    )
                }
                {successMessage ? (<h4 className="m-2 text-success">{successMessage}</h4>):("")}
                {failureMessage ? (<h4 className="m-2 text-error">{failureMessage}</h4>):("")}
            </form>
        </>
    )
};

