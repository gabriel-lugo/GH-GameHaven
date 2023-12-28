const apiConfig = {
  baseUrl: `https://corsproxy.io?https://api.igdb.com/v4/`,
  clientID: import.meta.env.VITE_IGDB_CLIENT_ID,
  authorization: import.meta.env.VITE_IGDB_AUTHORIZATION,
};

export default apiConfig;
