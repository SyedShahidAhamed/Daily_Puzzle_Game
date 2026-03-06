import { render, screen } from "@testing-library/react";
import ScoreBoard from "../components/ScoreBoard";

test("renders score correctly", () => {
render(<ScoreBoard score={50} solved={5} />);

expect(screen.getByText(/score/i)).toBeInTheDocument();
});
