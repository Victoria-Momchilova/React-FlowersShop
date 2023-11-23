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