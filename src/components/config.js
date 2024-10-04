export const Config = {
  API_URL: "http://localhost:8000",
  AUTH_TOKEN: () => {
    return localStorage.getItem("token");
  },
};
