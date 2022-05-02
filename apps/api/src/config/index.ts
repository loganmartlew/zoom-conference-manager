export const db = () => ({
  host: process.env.PG_HOST || '',
  port: +(process.env.PG_PORT || ''),
  username: process.env.PG_USER || '',
  password: process.env.PG_PASS || '',
  database: process.env.PG_DBNM || '',
});
