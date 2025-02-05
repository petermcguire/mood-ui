import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { vi } from 'vitest';
import App from './App'; // Adjust the path according to your file structure

describe('App Component', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear previous mocks between tests
    });

    it('renders the Login component', () => {
        const mockLoginService = vi.fn().mockResolvedValue({
            token: 'test-token',
            user: { username: 'testuser', email: 'testuser@example.com' },
        });

        render(<App loginService={mockLoginService} />);

        // Assert that the Login component is rendered
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('calls loginService with the correct parameters and handles success', async () => {
        const mockLoginService = vi.fn().mockResolvedValue({
            token: 'test-token',
            user: { username: 'testuser', email: 'testuser@example.com' },
        });

        render(<App loginService={mockLoginService} />);

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockLoginService).toHaveBeenCalledTimes(1);
            expect(mockLoginService).toHaveBeenCalledWith('testuser', 'password123');
        });
    });

    it('handles login failure gracefully', async () => {
        const mockLoginService =
            vi.fn().mockRejectedValue(new Error('Login failed'));

        const consoleErrorSpy =
            vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<App loginService={mockLoginService} />);

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Login failed'));
        });

        consoleErrorSpy.mockRestore();
    });
});