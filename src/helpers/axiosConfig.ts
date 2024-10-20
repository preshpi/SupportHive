import axios from "axios";

// SANITY AXIOS INSTANCE
export const Axios = axios.create({
  baseURL: "/api/",
  headers: { "X-Custom-Header": "foobar", "Content-Type": "application/json" },
});
