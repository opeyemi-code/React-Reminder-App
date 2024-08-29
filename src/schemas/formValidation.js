import * as yup from "yup";

export const basicSchema = yup.object().shape({
  title: yup.string().max(11).required("Title field cannot be blank"),
  description: yup
    .string()
    .max(32)
    .required("Description field cannot be bank"),
  date: yup.string().required("Set date"),
  time: yup.string().required("Set time"),
});
