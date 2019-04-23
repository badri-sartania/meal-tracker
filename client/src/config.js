const hostname = window.location.hostname;

const hostUrl = {
  localhost: "http://localhost:4000",
  "127.0.0.1": "http://127.0.0.1:4000"
};

const apiBase = hostUrl[hostname],
  apiUrl = url => apiBase + url,
  apiTokenLabel = "Authorization",
  apiTokenPrefix = "Bearer ",
  apiTokenValue = token => apiTokenPrefix + token;

export const api = {
  base: apiBase,
  url: apiUrl,
  tokenLabel: apiTokenLabel,
  tokenPrefix: apiTokenPrefix,
  tokenValue: apiTokenValue
};

export const Role = {
  Admin: "Admin",
  Manager: "Manager",
  User: "User"
};

export const ErrorCode = {
  INVALID_TOKEN: "INVALID_TOKEN"
};
