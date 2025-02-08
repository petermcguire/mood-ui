import {vi} from "vitest";

export const mockLoginService = vi.fn().mockResolvedValue({
    token: 'test-token',
    user: { username: 'testuser', email: 'testuser@example.com' },
});