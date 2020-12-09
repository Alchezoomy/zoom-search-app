import request from "superagent";

// very nice! happy to see these fetches abstracted out into their own file instead of clogging out your components
const URL = "https://alchezoomy.herokuapp.com/";

export async function fetchFavorites(token) {
  try {
    const response = await request
      .get(`${URL}api/favorites`)
      .set("Authorization", token);

    return response.body;
  } catch (err) {
    throw err;
  }
}
export async function fetchBookmarks(token) {
  try {
    const response = await request
      .get(`${URL}api/bookmarks`)
      .set("Authorization", token);

    return response.body;
  } catch (err) {
    throw err;
  }
}

export async function fetchPublishedVideos(token) {
  try {
    const response = await request
      .get(`${URL}api/meetings`)
      .set("Authorization", token);

    return response.body;
  } catch (err) {
    throw err;
  }
}
export async function searchPublishedVideos(search, token) {
  try {
    const response = await request
      .get(`${URL}api/meetings/?search=${search}`)
      .set("Authorization", token);

    return response.body;
  } catch (err) {
    throw err;
  }
}

export async function fetchVideo(someId, token) {
  try {
    const response = await request
      .get(`${URL}api/meetings/${someId}`)
      .set("Authorization", token);

    return response.body;
  } catch (err) {
    throw err;
  }
}

export async function fetchTranscript(someId, token) {
  try {
    const response = await request
      .get(`${URL}api/transcripts/${someId}`)
      .set("Authorization", token);

    return response.body;
  } catch (err) {
    throw err;
  }
}

export async function fetchChat(someId, token) {
  try {
    const response = await request
      .get(`${URL}api/chats/${someId}`)
      .set("Authorization", token);

    return response.body;
  } catch (err) {
    throw err;
  }
}

export async function deleteVideo(someId, token) {
  try {
    await request
      .delete(`${URL}api/meetings/${someId}`)
      .set("Authorization", token);

    return;
  } catch (err) {
    throw err;
  }
}
export async function deleteFavoriteVideo(someId, token) {
  try {
    await request
      .delete(`${URL}api/favorites/${someId}`)
      .set("Authorization", token);

    return;
  } catch (err) {
    throw err;
  }
}
export async function deleteBookmark(someId, token) {
  try {
    await request
      .delete(`${URL}api/bookmarks/${someId}`)
      .set("Authorization", token);

    return;
  } catch (err) {
    throw err;
  }
}

export async function publishVideo(newVideo) {
  try {
    await request.post(`${URL}api/meetings`).send(newVideo);

    return;
  } catch (err) {
    throw err;
  }
}

export async function favoriteVideo(newVideo, token) {
  try {
    await request
      .post(`${URL}api/favorites`)
      .send(newVideo)
      .set("Authorization", token);

    return;
  } catch (err) {
    throw err;
  }
}

export async function bookmarkVideo(newVideo, token) {
  try {
    await request
      .post(`${URL}api/bookmarks`)
      .send(newVideo)
      .set("Authorization", token);

    return;
  } catch (err) {
    throw err;
  }
}

export async function updateVideo(someId, newVideo) {
  try {
    await request.put(`${URL}api/meetings/${someId}`).send(newVideo);

    return;
  } catch (err) {
    throw err;
  }
}
