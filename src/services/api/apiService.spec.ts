import { login } from './apiService';
import { vi, Mock } from 'vitest';


// Mock the fetch API globally
global.fetch = vi.fn();

describe('apiService - login', () => {
    const mockAPI_URL = 'https://mock-api.com';

    beforeEach(() => {
        vi.clearAllMocks(); // Reset mocks between tests
    });

    it('should call the API with correct payload and return the login response', async () => {
        const mockResponse = {
            token: 'test-token',
            user: { username: 'testuser', email: 'testuser@example.com' },
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

        const payload = { username: 'invaliduser', password: 'wrongpassword' };

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

        const payload = { username: 'testuser', password: 'password123' };

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