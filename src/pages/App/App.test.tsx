import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { vi } from 'vitest';
import App from './App'; // Adjust the path according to your file structure

describe('App Component', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear previous mocks between tests
    });

    it('renders the Login component', () => {
        render(<App />);

        // Assert that the Login component is rendered
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('calls handleLogin with correct parameters on login', async () => {
        global.fetch = vi.fn(
            async (): Promise<Response> =>
                new Response(JSON.stringify({ token: 'test-token' }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }),
        );

        render(<App />);

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        // Simulate user interaction
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);



        // Assert fetch was called with the correct data
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'testuser',
                password: 'password123',
            }),
        });
    });

    it('handles login failure gracefully', async () => {
        global.fetch = vi.fn(
            async (): Promise<Response> =>
                new Response(JSON.stringify({ message: 'Login failed' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }),
        );
        const consoleErrorSpy = vi.spyOn(console, 'error');

        render(<App />);

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        // Simulate user interaction
        fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(loginButton);

        // Assert fetch was called
        expect(global.fetch).toHaveBeenCalledTimes(1);

        // Assert that an error was logged (optional)
        await waitFor( () => expect(consoleErrorSpy).toHaveBeenCalledWith(
            new Error('Login failed'))
        );
        consoleErrorSpy.mockRestore();
    });
});