import React from "react";
import { setupServer } from "msw/node";

import { signUpResponse } from "tests/handlers";
import { screen, render, fireEvent, cleanup, waitFor } from "tests/render";

import SignUp from "pages/auth/SignUp";

const server = setupServer(signUpResponse);

const email =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15) +
  "@gmail.com";

describe("Sign Up Page", () => {
  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });

  afterAll(() => server.close());

  it("should render the sign up page", async () => {
    render(<SignUp />);

    const pageTitle = screen.getByRole("heading");
    expect(pageTitle).toBeDefined();
    expect(pageTitle.textContent).toBe("Sign Up");

    expect(screen.getByLabelText("Name")).toBeDefined();
    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();

    expect(screen.getByRole("button")).toBeDefined();
    expect(screen.getByRole("button").textContent).toBe("Sign Up");

    expect(screen.getByRole("link")).toBeDefined();
    expect(screen.getByRole("link").textContent).toBe("Sign In");
  });

  it("should show validation errors on submitting invalid data.", async () => {
    render(<SignUp />);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(async () => {
      expect(screen.getAllByText("Required!")).toHaveLength(3);
      await expect(screen.getByText("Please enter valid email!")).toBeDefined();
    });
  });

  it("should show sign up success message when signed up successfully", async () => {
    render(<SignUp />);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    fireEvent.change(nameInput, { target: { value: "Test1" } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "test123" } });

    expect(nameInput.value).toBe("Test1");
    expect(emailInput.value).toBe(email);
    expect(passwordInput.value).toBe("test123");
    expect(confirmPasswordInput.value).toBe("test123");

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(async () => {
      await expect(screen.getByText("Success")).toBeDefined();
      await expect(
        screen.getByText("Signed up Successfully! Please Sign In.")
      ).toBeDefined();
    });
  });

  it("should match snapshot of Sign Up Page", () => {
    const { asFragment } = render(<SignUp />);

    expect(asFragment()).toMatchSnapshot();
  });
});
