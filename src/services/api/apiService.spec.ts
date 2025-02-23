import {addMood, AddMoodPayload, login, LoginPayload, LoginResponse} from './apiService';
import { vi, Mock } from 'vitest';


// Mock the fetch API globally
global.fetch = vi.fn();

describe('apiService', () => {
    const mockAPI_URL = 'https://mock-api.com';

    describe('login', () => {
        it('should call the API with correct payload and return the login response', async () => {
            const mockResponse: LoginResponse = {
                accessToken: "testToken",
                userId: 1
            };

            // Mock fetch to simulate a successful response
            (global.fetch as Mock).mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValueOnce(mockResponse),
            });

            const payload = { username: 'testuser', password: 'password123' };

            const response = await login(payload, mockAPI_URL);

            // Assert fetch is called exactly once with the correct arguments
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(`${mockAPI_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            // Assert the response is the same as the mock response
            expect(response).toEqual(mockResponse);
        });

        it('should throw an error when the response is not ok', async () => {
            // Mock fetch to simulate a failed response
            (global.fetch as Mock).mockResolvedValueOnce({
                ok: false,
                json: vi.fn(),
            });

            const payload: LoginPayload = { username: 'invaliduser', password: 'wrongpassword' };

            // Expect the login function to throw a "Login failed" error
            await expect(login(payload, mockAPI_URL)).rejects.toThrow('Login failed');

            // Assert that fetch was called with the correct arguments
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(`${mockAPI_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        });

        it('should throw an error if the fetch call itself fails', async () => {
            // Mock fetch to simulate a network error or similar failure
            (global.fetch as Mock).mockRejectedValueOnce(new Error('Network error'));

            const payload: LoginPayload = { username: 'testuser', password: 'password123' };

            // Expect the login function to throw the same network error
            await expect(login(payload, mockAPI_URL)).rejects.toThrow('Network error');

            // Assert that fetch was called with the correct arguments
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(`${mockAPI_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        });
    });
    //
    // describe('addMood', () => {
    //     it('should call the API with correct payload and return the added moods as response', async () => {
    //         const payload: AddMoodPayload = { level: 1, timestamp: new Date('2013-03-04T22:44:30.652Z') }
    //         const response = await addMood(payload, mockAPI_URL);
    //         // Assert the response is the same as the mock response
    //         expect(true).toEqual(true);
    //     });
    // });
});