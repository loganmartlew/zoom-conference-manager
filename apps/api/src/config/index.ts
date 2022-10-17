export const db = () => ({
  host: process.env.PG_HOST || '',
  port: +(process.env.PG_PORT || ''),
  username: process.env.PG_USER || '',
  password: process.env.PG_PASS || '',
  database: process.env.PG_DBNM || '',
});

export const zoom = () => ({
  accountId: process.env.ZOOM_ACCOUNT_ID || '',
  clientId: process.env.ZOOM_CLIENT_ID || '',
  clientSecret: process.env.ZOOM_CLIENT_SECRET || '',
});
