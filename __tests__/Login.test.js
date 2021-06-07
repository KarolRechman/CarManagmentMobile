/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import SignIn from "../screens/Onboarding";

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

afterEach(cleanup);

describe("SignIn", () => {
  it("Render check", async () => {
    const { getByText } = render(<SignIn login={mockLogin} />);

    const link = await waitFor(() => getByText("Zapomniałeś hasła?"));
    fireEvent.submit(screen.getByRole("button"));

    expect(link).toBeTruthy();
    expect(mockLogin).not.toBeCalled();
  });

  it("should display matching error when email and password is invalid", async () => {
    render(<SignIn login={mockLogin} />);

    fireEvent.input(screen.getByRole("textbox", { name: "Adres Email" }), {
      target: {
        value: "test",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: "Hasło" }), {
      target: {
        value: "password",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(mockLogin).not.toBeCalled();
    expect(screen.getByRole("textbox", { name: "Adres Email" }).value).toBe(
      "test"
    );
    expect(screen.getByRole("textbox", { name: "Hasło" }).value).toBe(
      "password"
    );
  });

  it("check if email and password is valid and can proceed", async () => {
    render(<SignIn login={mockLogin} />);

    fireEvent.input(screen.getByRole("textbox", { name: "Adres Email" }), {
      target: {
        value: "test3@gamil.com",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: "Hasło" }), {
      target: {
        value: "1234Aa",
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Zaloguj się" }));
    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    mockLogin("test3@gamil.com", "1234Aa");
    expect(mockLogin).toHaveBeenCalled();
    expect(mockLogin).toBeCalledWith("test3@gamil.com", "1234Aa");

    expect(screen.getByRole("textbox", { name: "Adres Email" }).value).toBe(
      "test3@gamil.com"
    );
    expect(screen.getByRole("textbox", { name: "Hasło" }).value).toBe("1234Aa");
  });
});
