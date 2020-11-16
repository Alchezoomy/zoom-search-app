import request from 'superagent';

const URL = process.env.REACT_APP_API_URL || 'https://.com/'; // fallback

export async function fetchAllVideos() {
    try {
        const response = await request.get(`https://api.zoom.us/v2/users/{userId}/recordings`);

        return response.body;
    } catch (err) {
        throw err;
    }
}
export async function fetchFavorites() {
    try {
        const response = await request.get(`${URL}favorites`);

        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function fetchPublishedVideos() {
    try {
        const response = await request.get(`${URL}videos`);

        return response.body;
    } catch (err) {
        throw err;
    }
}
export async function searchPublishedVideos(search) {
    try {
        const response = await request.get(`${URL}videos/?search=${search}`);

        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function fetchVideo(someId) {
    try {
        const response = await request.get(`${URL}videos/${someId}`);

        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function deleteVideo(someId) {
    try {
        await request.delete(`${URL}videos/${someId}`);

        return;
    } catch (err) {
        throw err;
    }
}
export async function deleteFavoriteVideo(someId) {
    try {
        await request.delete(`${URL}favorites/${someId}`);

        return;
    } catch (err) {
        throw err;
    }
}

export async function publishVideo(newVideo) {
    try {
        await request
            .post(`${URL}videos`)
            .send(newVideo);

        return;
    } catch (err) {
        throw err;
    }
}
export async function favoriteVideo(newVideo) {
    try {
        await request
            .post(`${URL}favorites`)
            .send(newVideo);

        return;
    } catch (err) {
        throw err;
    }
}

export async function updateVideo(someId, newVideo) {
    try {
        await request
            .put(`${URL}videos/${someId}`)
            .send(newVideo);

        return;
    } catch (err) {
        throw err;
    }
}
