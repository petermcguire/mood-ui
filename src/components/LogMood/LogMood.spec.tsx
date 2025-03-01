import { render, screen } from '@testing-library/react';
import {vi, expect, it, describe} from 'vitest';
import LogMood from "./LogMood.tsx";


describe('LogMood component', () => {
    beforeEach(() => {
        const mockOnSubmit = vi.fn();
        render(<LogMood onMoodSubmit={mockOnSubmit}/>);
    });

    it('renders the log mood form', () => {
        const heading = screen.getByRole('heading', { name: /log yer mood/i });
        expect(heading).toBeInTheDocument();
        // const rating = screen.getByRole('slider', { name: /mood/i });
        // expect(rating).toBeInTheDocument();
        const button = screen.getByRole('button', { name: /submit/i });
        expect(button).toBeInTheDocument();
    });
});