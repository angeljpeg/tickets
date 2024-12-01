export const API_URL = "http://localhost:4000/api/v1";  


export const queryGet = async (path, params) => {
    const url = `${API_URL}/${path}${params ?? ''}`;
    console.log(url);
    const res = await fetch(url);
    return res.json();
}

export const queryDelete = async (path, params) => {
    const url = `${API_URL}/${path}${params ?? ''}`;
    const res = await fetch(url, {
        method: 'DELETE'
    });
    return res.json();
}

export const queryPost = async (path, params) => {
    const url = `${API_URL}/${path}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });
    return res.json();
}