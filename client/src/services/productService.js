const baseURL = 'http://localhost:3030/jsonstore/products';
const commentsURL = 'http://localhost:3030/jsonstore/comments';

export const getAll = async () => {
    const response = await fetch(baseURL);
    const result = await response.json();

    const data = Object.values(result);
    return data;
};

export const singleProduct = async (id) => {
    const response = await fetch(`${baseURL}/${id}`);
    const result = await response.json();

    return result;
};

export const getAllComments = async () => {
    const response = await fetch(`${commentsURL}/comments`);
    const result = await response.json();

    const data = Object.values(result);
    return data;
};

export const setNewComment = async (data) => {
    const body = {
        "_id": data._id,
        "productId": data.productId,
        "name": data.name,
        "imageurl": data.imageurl,
        "text": data.text
    }

    const response = await fetch(`${commentsURL}/comments`, {
        method: 'POST',
        headers: {
            'Content-type': 'aplication/json',
        },
        body: JSON.stringify(body),
    });

    const result = await response.json();
    console.log(result);
    return result;
};

export const getEditComment = async (id) => {
    const response = await fetch(`${commentsURL}/comments/${id}`);
    const result = await response.json();

    return result;
};

export const setEditComment = async (data) => {
    const body = {
        "_id": data._id,
        "productId": data.productId,
        "name": data.name,
        "imageurl": data.imageurl,
        "text": data.text
    };

    const response = await fetch(`${commentsURL}/comments/${data._id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'aplication/json',
        },
        body: JSON.stringify(body),
    });

    const result = await response.json();
    return result;
};

export const deleteComment = async (id) => {
    const response = await fetch(`${commentsURL}/comments/${id}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    return result;
};