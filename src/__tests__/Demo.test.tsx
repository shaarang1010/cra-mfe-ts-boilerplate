import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DemoComp } from "../Demo";

describe("render Demo Component", () => {
  beforeAll(() => {
    render(<DemoComp text="This is demo component" />);
  });
  test("should display a demo component with a header tag", async () => {
    expect(screen.getByText("This is demo component")).toBeDefined();
  });
});
