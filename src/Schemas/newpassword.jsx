import * as yup from "yup";

export const newpasswordSchema = yup.object({
    password: yup.string().min(8, "Password must contain min 8 characters").required("Password is Required"),
    confirmPassword: yup.string().min(8, "Password must contain min 8 characters").required("ConfirmPassword is Required")
});