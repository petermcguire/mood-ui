import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { vi } from 'vitest';
import App from './App'; // Adjust the path according to your file structure

describe('App Component', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear previous mocks between tests
    });

    it('renders the Login component', () => {
        const mockHandleLogin = vi.fn().mockResolvedValue(undefined);

        render(<App handleLogin={mockHandleLogin} />);

        // Assert that the Login component is rendered
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('calls handleLogin with the correct parameters and handles success', async () => {
        const mockHandleLogin = vi.fn().mockResolvedValue(undefined);

        render(<App handleLogin={mockHandleLogin} />);

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockHandleLogin).toHaveBeenCalledTimes(1);
            expect(mockHandleLogin).toHaveBeenCalledWith('testuser', 'password123');
        });
    });
});