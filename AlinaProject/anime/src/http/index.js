const KITSU_API_URL = 'https://kitsu.io/api/edge/';

export const getAllAnime = async (page = 1) => {
    try {
        const response = await fetch(`${KITSU_API_URL}anime?page[limit]=20&page[offset]=${(page - 1) * 20}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching anime:", error);
        return [];
    }
};

export const getAnimeDetails = async (animeId) => {
    try {
        const response = await fetch(`${KITSU_API_URL}anime/${animeId}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching anime details:", error);
        return null;
    }
};
