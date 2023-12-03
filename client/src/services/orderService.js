const ordersURL = 'http://localhost:3030/data/orders';

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