import Axios from "./defaultAxios";

export const fetchArticlesWithParams = async (category, countPage) => {
    const url = `/api/article/getArticlesWithCategory${
        countPage ? "?countPage=" + countPage : ""
    }`;

    return await Axios.get(url, {
        params: {
            category: category,
        },
    })
        .then(({ data }) => {
            return data;
        })
        .catch(({ response }) => {
            return response;
        });
};
