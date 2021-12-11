import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
require("dotenv").config();

const { REACT_APP_HOST, REACT_APP_BASE_URL, REACT_APP_API_KEY } = process.env;
console.log(REACT_APP_HOST);

const cryptoApiHeaders = {
  "x-rapidapi-host": REACT_APP_HOST,
  "x-rapidapi-key": REACT_APP_API_KEY,
};

const baseUrl = REACT_APP_BASE_URL;

const createReq = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createReq(`/coins?limit=${count}`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
