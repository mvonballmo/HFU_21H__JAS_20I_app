import { describe, expect, test } from "@jest/globals";
import React from "react";
import { render } from "@testing-library/react";
import App from "./Components/App";

describe("App Component", () => {
  test("App initial contents", () => {
    const { container } = render(<App />);

    expect(container.innerHTML).toMatchSnapshot();
  });
});
