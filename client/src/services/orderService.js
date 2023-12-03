const ordersURL = 'http://localhost:3030/data/orders';

export const getAllOrders = async (id) => {
    const query = new URLSearchParams({
        where: `_ownerId="${id}"`,
    });
    const response = await fetch(`${ordersURL}?${query}`);
    const result = await response.json();

    const data = result;
    return data;
};

export const setNewOrder = async (data, token) => {
    const body = {
        "products": data.products,
        "user": data.user,
    }

    const response = await fetch(`${ordersURL}`, {
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

export const getOrder = async (id) => {
    const response = await fetch(`${ordersURL}/${id}`);
    const result = await response.json();

    return result;
};