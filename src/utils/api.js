import axios from "axios";

const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.TMDB_ACCESS_TOKEN || "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTI3ODFjN2JkNWM0NmRlMjZmNjI3NjlhYmE1M2RiYiIsInN1YiI6IjY2MTdhNTA4ZDEzMzI0MDE2M2U0MjM3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XeXQb5pmqdrXc_AFzN-vuklR3crKjU46vKNGRA2E0cg";

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
