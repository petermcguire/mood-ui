// src/services/apiService.ts
import 'reflect-metadata';

import {deserializeArray, Type} from "class-transformer";

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
 * @param userId The user's ID
 * @param token
 * @returns The moods response if successful.
 * @throws Error if the request fails.
 */
export const allMoodsForUser =
    async (userId: number, token: string, apiUrl: string = serviceApiUrl): Promise<Mood[]> => {
        const response = await fetch(`${apiUrl}/user/${userId}/moods`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to get moods for user ${userId}`);
        }

        const json = await response.text();

        return deserializeArray<Mood>(Mood, json);
    };

/**
 * Sends a PATCH request, appending a mood to user.
 * @param payload - User login details.
 * @param apiUrl The API URL
 * @param userId The user's ID
 * @returns The moods response if successful.
 * @throws Error if the request fails.
 */
export const addMood =
    async (payload: AddMoodPayload, userId: number, apiUrl: string = serviceApiUrl): Promise<AddMoodResponse> => {
        const response = await fetch(`${apiUrl}/user/${userId}/moods`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Failed to add mood for user ${userId}`);
        }

        return response.json();
    };