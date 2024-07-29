import * as yup from "yup";

export const urlShortenSchema = yup.object({
    longUrl: yup.string().required("LongURL is Required"),
    shortname: yup.string().required("Shortname is Required"),
});