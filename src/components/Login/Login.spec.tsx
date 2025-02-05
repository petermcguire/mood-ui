import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// Mock the `onLogin` function
const mockOnLogin = vi.fn();

describe('Login component', () => {
    beforeEach(() => {
        // Reset mock functions before each test
        vi.clearAllMocks();
        render(<Login onLogin={mockOnLogin} />);
    });

    it('renders the login form', () => {
        // Assert that input fields and button render
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('allows users to type in the username and password fields', async () => {
        // Type into username and password fields
        const usernameField = screen.getByLabelText('Username');
        const passwordField = screen.getByLabelText('Password');

        await userEvent.type(usernameField, 'testuser');
        await userEvent.type(passwordField, 'password123');

        // Assert the typed values
        expect((usernameField as HTMLInputElement).value).toBe('testuser');
        expect((passwordField as HTMLInputElement).value).toBe('password123');
    });

    it('calls onLogin with correct values when the form is submitted', async () => {
        // Simulate typing and form submission
        const usernameField = screen.getByLabelText('Username');
        const passwordField = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: 'Login' });

        await userEvent.type(usernameField, 'testuser');
        await userEvent.type(passwordField, 'password123');
        fireEvent.click(submitButton);

        // Verify that `onLogin` was called with the correct parameters
        expect(mockOnLogin).toHaveBeenCalledTimes(1);
        expect(mockOnLogin).toHaveBeenCalledWith('testuser', 'password123');
    });

    it('shows an error message when required fields are empty', () => {
        // Simulate form submission without filling fields
        const submitButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(submitButton);

        // Look for error message
        const error = screen.getByText('Please fill out all fields');
        expect(error).toBeInTheDocument();

        // Ensure `onLogin` is not called
        expect(mockOnLogin).not.toHaveBeenCalled();
    });
});