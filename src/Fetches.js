import request from 'superagent';

const URL = 'https://alchezoomy.herokuapp.com/';

// export async function fetchAllVideos() {
//     try {
//         const response = await request.get(`https://api.zoom.us/v2/users/{userId}/recordings`);

//         return response.body;
//     } catch (err) {
//         throw err;
//     }
// }
export async function fetchFavorites() {
    try {
        const response = await request.get(`${URL}api/favorites`);

        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function fetchPublishedVideos() {
    try {
        const response = await request.get(`${URL}api/meetings`);

        return response.body;
    } catch (err) {
        throw err;
    }
}
export async function searchPublishedVideos(search) {
    try {
        const response = await request.get(`${URL}api/meetings/?search=${search}`);

        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function fetchVideo(someId) {
    try {
        const response = await request.get(`${URL}api/meetings/${someId}`);

        return response.body;
    } catch (err) {
        throw err;
    }
}

export async function deleteVideo(someId) {
    try {
        await request.delete(`${URL}api/meetings/${someId}`);

        return;
    } catch (err) {
        throw err;
    }
}
export async function deleteFavoriteVideo(someId) {
    try {
        await request.delete(`${URL}api/favorites/${someId}`);

        return;
    } catch (err) {
        throw err;
    }
}

export async function publishVideo(newVideo) {
    try {
        await request
            .post(`${URL}api/meetings`)
            .send(newVideo);

        return;
    } catch (err) {
        throw err;
    }
}
export async function favoriteVideo(newVideo) {
    try {
        await request
            .post(`${URL}api/favorites`)
            .send(newVideo);

        return;
    } catch (err) {
        throw err;
    }
}

export async function updateVideo(someId, newVideo) {
    try {
        await request
            .put(`${URL}api/meetings/${someId}`)
            .send(newVideo);

        return;
    } catch (err) {
        throw err;
    }
}
