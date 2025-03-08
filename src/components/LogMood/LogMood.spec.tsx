import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {vi, expect, it, describe, Mock, beforeEach} from 'vitest';
import LogMood from "./LogMood.tsx";



describe('LogMood component', () => {
    let submitButton: HTMLElement;
    const username = 'testuser';
    const mockNavigate = vi.fn().mockResolvedValue(undefined);

    describe('Successes', () => {
        let mockOnSubmit: Mock;

        beforeEach(() => {
            mockOnSubmit = vi.fn().mockResolvedValue(undefined);
            render(<LogMood onMoodSubmit={mockOnSubmit} username={username} navigate={mockNavigate}/>);
            submitButton = screen.getByRole('button', { name: /submit/i });
        });

        it('renders the log mood form', () => {
            const heading = screen.getByRole('heading', { name: `${username}, log yer mood`});
            expect(heading).toBeInTheDocument();
            const rating = screen.getByTestId('mood-rating');
            expect(rating).toBeInTheDocument();
            expect(submitButton).toBeInTheDocument();
        });

        it('calls navigate with correct arguments', async () => {
            expect(submitButton).toBeInTheDocument();
            fireEvent.click(submitButton);
            await waitFor(() => {
                expect(mockNavigate).toHaveBeenCalledOnce();
                expect(mockNavigate).toHaveBeenCalledWith({ to: "/dashboard", replace: true });
            });
        });
    });

    describe('Failures', () => {
        let mockOnSubmit: Mock;
        let mockNavigate: Mock;

        it('catches submit error and displays error message', async () => {
            const errorMessage = 'Submit failed';
            mockNavigate = vi.fn().mockResolvedValue(undefined);
            mockOnSubmit = vi.fn().mockRejectedValue(new Error(errorMessage));
            render(<LogMood onMoodSubmit={mockOnSubmit} username={username} navigate={mockNavigate}/>);
            submitButton = screen.getByRole('button', { name: /submit/i });
            fireEvent.click(submitButton);
            await waitFor(() => {
                const error = screen.getByText(errorMessage);
                expect(error).toBeInTheDocument();
            });
        });

        it('catches navigate error and displays error message', async () => {
            const errorMessage = 'Navigate failed';
            mockNavigate = vi.fn().mockRejectedValue(new Error(errorMessage));
            mockOnSubmit = vi.fn().mockResolvedValue(undefined);
            render(<LogMood onMoodSubmit={mockOnSubmit} username={username} navigate={mockNavigate}/>);
            submitButton = screen.getByRole('button', { name: /submit/i });
            fireEvent.click(submitButton);
            await waitFor(() => {
                const error = screen.getByText(errorMessage);
                expect(error).toBeInTheDocument();
            });
        });
    });
});