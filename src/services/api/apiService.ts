// src/services/apiService.ts
import 'reflect-metadata';
import {deserializeArray, Type} from "class-transformer";
import {key} from "../../hooks/useAuth.ts";

const serviceApiUrl = import.meta.env.VITE_MOOD_API_URL;


export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    userId: number;
}

export class Mood {

    level: number;

    @Type(() => Date)
    timestamp: Date;
}

export type AddMoodPayload = Mood;
export type AddMoodResponse = Mood[];

const getKey = () => {
    const localKey = localStorage.getItem(key);
    if (localKey != null) return JSON.parse(localKey);
    else throw new Error(`User not logged in.`);
};

/**
 * Sends a POST request to log a user in.
 * @param payload - User login details.
 * @param apiUrl The API URL
 * @returns The login response if successful.
 * @throws Error if the request fails.
 */
export const login =
    async (payload: LoginPayload, apiUrl: string = serviceApiUrl): Promise<LoginResponse> => {
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

    return await response.json();
};

/**
 * Sends a GET request to get a user's moods.
 * @param apiUrl The API URL
 * @returns The moods response if successful.
 * @throws Error if the request fails.
 */
export const allMoodsForUser =
    async (apiUrl: string = serviceApiUrl): Promise<Mood[]> => {
        const key = getKey();

        const response = await fetch(`${apiUrl}/user/${key.userId}/moods`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key.accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to get moods for user ${key.userId}`);
        }

        const json = await response.text();

        return deserializeArray<Mood>(Mood, json);
    };

/**
 * Sends a PATCH request, appending a mood to user.
 * @param payload - User login details.
 * @param apiUrl The API URL
 * @returns The moods response if successful.
 * @throws Error if the request fails.
 */
export const addMood =
    async (payload: AddMoodPayload, apiUrl: string = serviceApiUrl): Promise<AddMoodResponse> => {
        const key = getKey();

        const response = await fetch(`${apiUrl}/user/${key.userId}/moods`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key.accessToken}`,
            },
            body: JSON.stringify([payload]),
        });

        if (!response.ok) {
            throw new Error(`Failed to add mood for user ${key.userId}`);
        }

        return response.json();
    };