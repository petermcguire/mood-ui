import {Mock, vi, expect, afterEach, it, describe} from 'vitest';
import ApiService, {LoginPayload, LoginResponse, Mood} from './apiService';


// Mock the fetch API globally
global.fetch = vi.fn();

describe('apiService', () => {
    const mockAPIUrl = 'https://mock-api.com';
    const mockLoginResponse: LoginResponse = {
        accessToken: "testToken",
        userId: 1
    };

    afterEach(() => {
        vi.resetAllMocks();
    })

    describe('Mood', () => {
        it('should correctly initialize fields during object creation', () => {
            const level = 5;
            const timestamp = new Date();

            const mood = new Mood();
            mood.level = level;
            mood.timestamp = timestamp;

            expect(mood.level).toBe(level);
            expect(mood.timestamp).toBe(timestamp);
        });
    });

    describe('login', () => {
        it('should call the API with correct payload and return the login response', async () => {
            // Mock fetch to simulate a successful response
            (global.fetch as Mock).mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValueOnce(mockLoginResponse),
            });

            const payload = {username: 'testuser', password: 'password123'};

            const response = await ApiService.login(payload, mockAPIUrl);

            // Assert fetch is called exactly once with the correct arguments
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(`${mockAPIUrl}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            });

            // Assert the response is the same as the mock response
            expect(response).toEqual(mockLoginResponse);
        });

        it('should throw an error when the response is not ok', async () => {
            // Mock fetch to simulate a failed response
            (global.fetch as Mock).mockResolvedValueOnce({
                ok: false,
                json: vi.fn(),
            });

            const payload: LoginPayload = {username: 'invaliduser', password: 'wrongpassword'};

            // Expect the login function to throw a "Login failed" error
            await expect(ApiService.login(payload, mockAPIUrl)).rejects.toThrow('Login failed');
        });

        it('should throw an error if the fetch call itself fails', async () => {
            // Mock fetch to simulate a network error or similar failure
            (global.fetch as Mock).mockRejectedValueOnce(new Error('Network error'));

            const payload: LoginPayload = {username: 'testuser', password: 'password123'};

            // Expect the login function to throw the same network error
            await expect(ApiService.login(payload, mockAPIUrl)).rejects.toThrow('Network error');
        });
    });

    describe('allMoodsForUser', () => {
        const mockResponse: Mood[] = [
            {level: 1, timestamp: new Date()},
            {level: 2, timestamp: new Date()},
        ];
        const testUserId = 1;
        const testToken = "testToken";

        it('should call the API with correct path and headers and return list of moods', async () => {
            // Mock fetch to simulate a successful response
            (global.fetch as Mock).mockResolvedValueOnce({
                ok: true,
                text: vi.fn().mockResolvedValueOnce(JSON.stringify(mockResponse)),
            });

            const response = await ApiService.allMoodsForUser(mockAPIUrl, mockLoginResponse);

            // Assert fetch is called exactly once with the correct arguments
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(`${mockAPIUrl}/user/${testUserId}/moods`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${testToken}`,
                },
            });

            // Assert the response is the same as the mock response
            expect(response).toEqual(mockResponse);
        });

        it('should throw an error when the response is not ok', async () => {
            // Mock fetch to simulate a failed response
            (global.fetch as Mock).mockResolvedValueOnce({
                ok: false,
                text: vi.fn(),
            });
            // Expect thrown error
            await expect(
                ApiService.allMoodsForUser(mockAPIUrl, mockLoginResponse)
            ).rejects.toThrow(`Failed to get moods for user ${testUserId}`);
        });
    });
});