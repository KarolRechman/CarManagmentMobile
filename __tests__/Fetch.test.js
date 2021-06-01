import React from "react";
import { render, cleanup, waitFor } from '@testing-library/react-native'
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
import Fetch from "../Fetch";
import api, { API_TYPES } from "../actions/api";


afterEach(cleanup);
jest.setTimeout(30000);

test("fetches and displays data", async () => {
    // We'll be explicit about what data Axios is to return when `get` is called.
    axiosMock.get.mockResolvedValueOnce({ data: { model: "Astra" } });
    const url = "/greeting";
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Fetch url={url} />);

    // const input = getByTestId('resolved')
    // console.log(input)

    expect(getByTestId("loading").props.children).toBe("Loading data...");



     await waitFor(() => expect(getByTestId('resolved')).toBeTruthy())


    // expect(getByTestId('resolved').props.children).toBe("Astra")
    expect(toJSON()).toMatchSnapshot()

    // expect(axiosMock.get).toHaveBeenCalledTimes(1);
    // expect(axiosMock.get).toHaveBeenCalledWith(url);
});



