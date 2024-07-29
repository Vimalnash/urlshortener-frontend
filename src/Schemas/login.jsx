import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().email("Enter a valid email").required("Email is Required"),
    password: yup.string().min(8, "Password must contain 8 characters").required("Password is Required")
});