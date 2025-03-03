import { render, screen } from '@testing-library/react';
import {vi, expect, it, describe} from 'vitest';
import LogMood from "./LogMood.tsx";


describe('LogMood component', () => {
    const username = 'testuser';
    beforeEach(() => {
        const mockOnSubmit = vi.fn();
        render(<LogMood onMoodSubmit={mockOnSubmit} username={username}/>);
    });

    it('renders the log mood form', () => {
        const heading = screen.getByRole('heading', { name: `${username}, log yer mood`});
        expect(heading).toBeInTheDocument();
        // const rating = screen.getByRole('slider', { name: /mood/i });
        // expect(rating).toBeInTheDocument();
        const button = screen.getByRole('button', { name: /submit/i });
        expect(button).toBeInTheDocument();
    });
});