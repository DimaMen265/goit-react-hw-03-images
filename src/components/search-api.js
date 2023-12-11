import axios from "axios";

const API_KEY = "40222608-3820d97c8748fab8cb367624f";

export const getImages = async (searchString, page, countInPage) => {
    const paramsObject = {
        key: API_KEY,
        q: searchString,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: countInPage,
        page: page,
    };

    const params = new URLSearchParams(paramsObject);
    
    return await axios.get(`https://pixabay.com/api/?${params}`);
};
