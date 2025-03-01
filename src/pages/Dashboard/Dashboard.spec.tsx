import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { vi } from "vitest";

// Mock LogMood component
vi.mock('../../components/LogMood/LogMood.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid='log-mood-mock'>LogMood Component</div>,
}));

describe('Dashboard component', () => {
  it("renders Dashboard component with ThemeProvider and LogMood child", () => {
    const mockedHandleMoodSubmit = vi.fn();
    // Render the Dashboard component
    render(<Dashboard data={[ { level: 1, timestamp: new Date() } ]} handleMoodSubmit={mockedHandleMoodSubmit}/>);

    // Ensure the ThemeProvider is applied via the LogMood child component (basic check for rendering)
    const logMoodElement = screen.getByTestId("log-mood-mock");
    expect(logMoodElement).toBeInTheDocument();
    expect(logMoodElement).toHaveTextContent("LogMood Component");
  });
});