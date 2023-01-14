import React from "react";
import { screen, render, fireEvent, waitFor } from "tests/render";

import NotFound from "pages/NotFound";

describe("NotFound Page", () => {
  it("should render the not found page", async () => {
    render(<NotFound />);

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

  it("should match snapshot of Not found page", () => {
    const { asFragment } = render(<NotFound />);

    expect(asFragment()).toMatchSnapshot();
  });
});
