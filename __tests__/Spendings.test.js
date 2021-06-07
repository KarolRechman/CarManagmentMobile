/* eslint-disable no-undef */
import { convert } from "../ComponentsToMock/SpendingsCalculations"
import { server, rest } from "../testServer";
import { API_TYPES } from "../actions/api";

it("Reading spending object", async () => {
  const rate = await convert();
  expect(rate).toEqual({"idSpendings":1,"date":"2020-10-12T00:00:00","carID":2,"costID":2,"price":912,"idUser":"2391ec09-dd54-4203-9f5c-bedf69e263c6"});
});

