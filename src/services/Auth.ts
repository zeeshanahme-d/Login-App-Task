interface fetchExecuteRequest {
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: any;
}

function fetchExecute(request: fetchExecuteRequest) {
    return fetch(request.url, {
        method: request.method,
        headers: request.headers,
        ...(request.body ? { body: JSON.stringify(request.body) } : {}),
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            return data;
        })
        .catch(err => {
            console.error('Error:', err);
        })
};

export interface LoginRequest {
    method: string;
    usernameOrEmail: string;
    password: string;
};


export const userLogin = (request: LoginRequest) => {
    const payload = {
        method: request.method,
        headers: { 'Content-Type': 'application/json' },
        url: "https://dummyjson.com/auth/login",
        body: {
            username: request.usernameOrEmail,
            password: request.password,
        },
    };
    return fetchExecute(payload);
};

interface GetUserRequest {
    method: string;
    accessToken: string;
};

export const getUser = (request: GetUserRequest) => {
    const payload = {
        method: request.method,
        headers: {
            'Authorization': `Bearer ${request.accessToken}`,
        },
        url: "https://dummyjson.com/auth/me"
    };
    return fetchExecute(payload);
};