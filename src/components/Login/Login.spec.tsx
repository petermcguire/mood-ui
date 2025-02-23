import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {Mock, vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// Mock the `onLogin` function
// const submitButton = screen.getByRole('button', { name: 'Login' });

describe('Login component', () => {
    let submitButton: HTMLElement;

    describe('Successes', () => {
        let mockOnLogin: Mock;

        beforeEach(() => {
            mockOnLogin = vi.fn().mockResolvedValue(undefined);
            render(<Login onLogin={mockOnLogin} />);
            submitButton = screen.getByRole('button', { name: 'Login' });
        });

        it('renders the login form', async () => {
            await waitFor(() => {
                // Assert that input fields and button render
                expect(screen.getByLabelText('Username')).toBeInTheDocument();
                expect(screen.getByLabelText('Password')).toBeInTheDocument();
                expect(submitButton).toBeInTheDocument();
            });
        });

        it('calls onLogin with correct values when the form is submitted', async () => {
            // Simulate typing and form submission
            const usernameField = screen.getByLabelText('Username');
            const passwordField = screen.getByLabelText('Password');

            await userEvent.type(usernameField, 'testuser');
            await userEvent.type(passwordField, 'password123');
            fireEvent.click(submitButton);

            await waitFor(() => {
                // Verify that `onLogin` was called with the correct parameters
                expect(mockOnLogin).toHaveBeenCalledTimes(1);
                expect(mockOnLogin).toHaveBeenCalledWith('testuser', 'password123');
            });
        });
    });

    describe('Failures', () => {
        let mockOnLogin: Mock;

        beforeEach(() => {
            mockOnLogin = vi.fn().mockRejectedValue(new Error('Login failed'));
            render(<Login onLogin={mockOnLogin} />);
            submitButton = screen.getByRole('button', { name: 'Login' });
        });

        it('shows an error message when required fields are empty', async () => {
            // Simulate form submission without filling fields
            fireEvent.click(submitButton);

            await waitFor(() => {
                // Look for error message
                const error = screen.getByText('Please fill out all fields');
                expect(error).toBeInTheDocument();

                // Ensure `onLogin` is not called
                expect(mockOnLogin).not.toHaveBeenCalled();
            });
        });

        it('shows an error message when onLogin fails', async () => {
            const usernameField = screen.getByLabelText('Username');
            const passwordField = screen.getByLabelText('Password');

            await userEvent.type(usernameField, 'testuser');
            await userEvent.type(passwordField, 'password123');
            // Simulate form submission without filling fields
            fireEvent.click(submitButton);

            // Look for error message
            await waitFor(() => {
                const error = screen.getByText('Login failed');
                expect(error).toBeInTheDocument();
            });
        });
    });
});