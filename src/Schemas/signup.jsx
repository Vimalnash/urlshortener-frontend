import * as yup from "yup";

export const signupSchema = yup.object({
    firstName: yup.string().required("FirstName is Required"),
    lastName: yup.string().required("LastName is Required"),
    userName: yup.string().required("UserName is Required"),
    email: yup.string().email("Enter a valid email").required("UserName is Required"),
    password: yup.string().min(8, 'Password must contain 8 characters').required("Password is Required")
});