import { render, screen } from "@testing-library/react";
import StatusBadge from "./components/StatusBadge";

test("renders submitted status badge", () => {
  render(<StatusBadge status="Application Submitted" />);
  expect(screen.getByText(/Submitted/i)).toBeInTheDocument();
});
