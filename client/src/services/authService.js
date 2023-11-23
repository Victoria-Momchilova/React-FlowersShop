const baseURL = 'http://localhost:3030/users';

export const login = async (data) => {
    const body = {
        "email": data.email,
        "password": data.password,
    }

    const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'aplication/json',
        },
        body: JSON.stringify(body),
    });

    const result = await response.json();

    return result;
};

export const register = async (data) => {
    const body = {
        "firstname": data.firstname,
        "lastname": data.lastname,
        "username": data.firstname,
        "email": data.email,
        "password": data.password,
        "repeatpassword": data.repeatpassword,
        "country": data.country,
        "city": data.city,
        "street": data.street,
        "streetNumber": data.streetNumber,
        "sameAddress": data.sameAddress,
        "shippingcountry": data.shippingcountry,
        "shippingcity": data.shippingcity,
        "shippingstreet": data.shippingstreet,
        "shippingstreetNumber": data.shippingstreetNumber
    }

    const response = await fetch(`${baseURL}/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'aplication/json',
        },
        body: JSON.stringify(body),
    });

    const result = await response.json();

    return result;
};