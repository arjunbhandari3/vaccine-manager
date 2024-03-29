import React from "react";
import { setupServer } from "msw/node";

import { signInResponse } from "tests/handlers";
import { screen, render, fireEvent, cleanup, waitFor } from "tests/render";

import SignIn from "pages/auth/SignIn";

const server = setupServer(signInResponse);

describe("Sign In Page", () => {
  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });

  afterAll(() => server.close());

  it("should render the sign in page", async () => {
    render(<SignIn />);

    const pageTitle = screen.getByRole("heading");
    expect(pageTitle).toBeDefined();
    expect(pageTitle.textContent).toBe("Sign In");

    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();

    expect(screen.getByRole("button")).toBeDefined();
    expect(screen.getByRole("button").textContent).toBe("Sign In");

    expect(screen.getByRole("link")).toBeDefined();
    expect(screen.getByRole("link").textContent).toBe("Sign Up");
  });

  it("should show validation errors on submitting invalid data.", async () => {
    render(<SignIn />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(async () => {
      await expect(screen.getByText("Required!")).toBeDefined();
      await expect(screen.getByText("Please enter valid email!")).toBeDefined();
    });
  });

  it("should redirect to home page when logged in successfully", async () => {
    render(<SignIn />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });

    expect(emailInput.value).toBe("test@gmail.com");
    expect(passwordInput.value).toBe("test123");

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(async () => {
      await expect(screen.getByText("Success")).toBeDefined();
      await expect(screen.getByText("Signed in Successfully!")).toBeDefined();
      await expect(window.location.pathname).toEqual("/");
    });
  });

  it("should match snapshot of Sign In Page", () => {
    const { asFragment } = render(<SignIn />);

    expect(asFragment()).toMatchSnapshot();
  });
});
