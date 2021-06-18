import * as yup from "yup";

export const checkCreateArticle = (data) => {
  const schema = yup.object().shape({
    head: yup
      .string()
      .min(16, "Head Of Article must be max characters more than or equal 16")
      .max(99, "Head Of Article must be max characters less than or equal 99")
      .required("Head Of Article must be required"),
    content: yup
      .string()
      .min(512, "Content Of Article characters must be more than or equal 255")
      .required("Content Of Article must be required"),
    category: yup
      .string()
      .min(1, "Category's must be selected")
      .required("Category's must be selected"),
    imageOfArticle: yup.string().required("image article's must be required"),
  });
  return schema.validate(data);
};
