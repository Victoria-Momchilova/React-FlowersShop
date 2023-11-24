const commentsURL = 'http://localhost:3030/data/comments';

export const getAllComments = async (id) => {
    const query = new URLSearchParams({
        where: `productId="${id}"`,
        load: `owner=_ownerId:users`
    });
    const response = await fetch(`${commentsURL}?${query}`);
    const result = await response.json();

    const data = result;
    return data;
};

export const setNewComment = async (data, token) => {
    const body = {
        "_id": data._id,
        "productId": data.productId,
        // "name": data.name,
        "imageurl": data.imageurl,
        "text": data.text
    }

    const response = await fetch(`${commentsURL}`, {
        method: 'POST',
        headers: {
            'Content-type': 'aplication/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(body),
    });

    const result = await response.json();
    
    return result;
};

export const getEditComment = async (id) => {
    const response = await fetch(`${commentsURL}/${id}`);
    const result = await response.json();

    return result;
};

export const setEditComment = async (data, token) => {
    const body = {
        "_id": data._id,
        "productId": data.productId,
        "name": data.name,
        "imageurl": data.imageurl,
        "text": data.text
    };

    const response = await fetch(`${commentsURL}/${data._id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'aplication/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(body),
    });

    const result = await response.json();
    return result;
};

export const deleteComment = async (id, token) => {
    const response = await fetch(`${commentsURL}/${id}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token,
        },
    });

    const result = await response.json();
    return result;
};