import * as Yup from "yup";
export const CreateFormSchema = Yup.object().shape({
  projectName: Yup.string().matches(
      /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/g,
      "alphabets are allowed & only one white space"
    )
    .min(3)
    .max(50).required("Please Enter Your Projectname"),
  description: Yup.string().matches(
      /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/g,
      "alphabets are allowed & only one white space"
    )
    .min(3)
    .max(50).required("Please Enter Your Description"),
  textTag: Yup.string().matches(
    /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/g,
    "alphabets are allowed & only one white space"
    )
    .min(3)
    .max(50).required("Please Enter Your TextTag")
});
