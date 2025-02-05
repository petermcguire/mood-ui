import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import LogMood from "./LogMood.tsx";


describe('LogMood component', () => {
    beforeEach(() => {
        // Reset mock functions before each test
        vi.clearAllMocks();
        render(<LogMood />);
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