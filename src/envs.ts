const envs = {
  API_URL: process.env.API_URL as string,
  VISITED_CONTACT_IDS_KEY: process.env.VISITED_CONTACT_IDS_KEY as string,
} as const;

export default envs;
