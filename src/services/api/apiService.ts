// src/services/apiService.ts

type LoginPayload = {
    username: string;
    password: string;
};

export type LoginResponse = {
    // Define the structure of the HTTP response data (example)
    token: string;
    user: { username: string; email: string };
};

/**
 * Sends a POST request to log a user in.
 * @param payload - User login details.
 * @param apiUrl
 * @returns The login response if successful.
 * @throws Error if the request fails.
 */
export const login =
    async (payload: LoginPayload, apiUrl: string): Promise<LoginResponse> => {
    const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
};