import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {vi, expect, it, describe} from 'vitest';
import LogMood from "./LogMood.tsx";
import {AddMoodResponse} from "../../services/api/apiService.ts";

const mockNavigate = vi.fn();
const mockOnSubmit = vi.fn(async (): Promise<AddMoodResponse> => []);
const mockOnSubmitError = vi.fn().mockRejectedValue(new Error('Submit failed'));

describe('LogMood component', () => {
    const username = 'testuser';

    beforeEach(() => {
    });

    it('renders the log mood form', () => {
        render(<LogMood onMoodSubmit={mockOnSubmit} username={username} navigate={mockNavigate}/>);
        const heading = screen.getByRole('heading', { name: `${username}, log yer mood`});
        expect(heading).toBeInTheDocument();
        const rating = screen.getByTestId('mood-rating');
        expect(rating).toBeInTheDocument();
        const button = screen.getByRole('button', { name: /submit/i });
        expect(button).toBeInTheDocument();
    });

    it('calls navigate with correct arguments', async () => {
        render(<LogMood onMoodSubmit={mockOnSubmit} username={username} navigate={mockNavigate}/>);
        const button = screen.getByRole("button", { name: /submit/i });
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledOnce();
            expect(mockNavigate).toHaveBeenCalledWith({ to: "/dashboard", replace: true });
        });
    });

    // it('catches error and displays error message', async () => {
    //     render(<LogMood onMoodSubmit={mockOnSubmitError} username={username} navigate={mockNavigate}/>);
    //     const button = screen.getByRole("button", { name: /submit/i });
    //     fireEvent.click(button);
    //
    //     await mockOnSubmit;
    //
    // });
});