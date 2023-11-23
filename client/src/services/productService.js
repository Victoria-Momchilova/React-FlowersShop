const baseURL = 'http://localhost:3030/jsonstore/products';

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

