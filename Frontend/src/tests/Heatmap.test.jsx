import { render } from "@testing-library/react";
import HeatmapContainer from "../components/HeatmapContainer";

test("heatmap renders without crashing", () => {
render(<HeatmapContainer />);
});
