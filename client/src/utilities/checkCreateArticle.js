import * as yup from "yup";
import { toastError } from "../components/toast";

export const checkCreateArticle = data => {
    const schema = yup.object().shape({
        headArticle: yup
            .string()
            .min(
                10,
                "Head Of Article must be max characters more than or equal 10",
            )
            .max(
                255,
                "Head Of Article must be max characters less than or equal 255",
            )
            .required("Head Of Article must be required"),
        contentArticle: yup
            .string()
            .min(
                255,
                "Content Of Article characters must be more than or equal 255",
            )

            .required("Content Of Article must be required"),
        category: yup
            .string()
            .min(1, "Category's must be selected")
            .required("Category's must be selected"),
        imageArticle: yup.string().required("image article's must be required"),
    });
    const result = schema
        .validate(data)
        .then(() => {
            return true;
        })
        .catch(notValid => {
            toastError(notValid.message);
            return false;
        });

    return result;
};
