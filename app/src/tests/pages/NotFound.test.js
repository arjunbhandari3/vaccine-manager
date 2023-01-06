import React from "react";

import NotFound from "pages/NotFound";
import renderWithStore from "tests/render";
import { screen, fireEvent, waitFor } from "@testing-library/react";

describe("NotFound Page", () => {
  it("should render the not found page", async () => {
    renderWithStore(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, the page you visited does not exist.")
    ).toBeInTheDocument();
    expect(screen.getByText("Back Home")).toBeInTheDocument();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  it("not found page in snapshot", () => {
    const { asFragment } = renderWithStore(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});
