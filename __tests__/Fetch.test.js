import React from "react";
import { render, cleanup, waitFor } from '@testing-library/react-native'
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
import Fetch from "../Fetch";

afterEach(cleanup);
jest.setTimeout(30000);

test("fetches and displays data", async () => {
    // We'll be explicit about what data Axios is to return when `get` is called.
    axiosMock.get.mockResolvedValueOnce({ data: { model: "Astra" } });
    const url = "/greeting";
    const { getByTestId, toJSON } = render(<Fetch url={url} />);

    expect(getByTestId("loading").props.children).toBe("Loading data...");

    await waitFor(() => expect(getByTestId('resolved')).toBeTruthy())

    expect(getByTestId('resolved').props.children).toBe("Astra")
    expect(toJSON()).toMatchSnapshot()
});



