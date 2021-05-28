import * as yup from "yup";
import { toastError } from "../components/toast";
export const checkLogin = (data) => {
    const schema = yup.object().shape({
        email: yup
            .string()
            .min(3, "email characters must be more than 3 characters")
            .email("email must be required")
            .required("email must be required"),
        password: yup
            .string()
            .min(3, "password characters must be more than 3 characters")
            .required("password must be required"),
    });

    const result = schema
        .validate(data)
        .then(() => {
            return true;
        })
        .catch((notValid) => {
            toastError(notValid.message);
            return false;
        });

    return result;
};
