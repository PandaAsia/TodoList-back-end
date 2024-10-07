import pg from "pg";
import {
  BD_DATABASE,
  BD_HOST,
  BD_PASSWORD,
  BD_PORT,
  BD_USER,
} from "./config.js";

export const pool = new pg.Pool({
  user: BD_USER,
  host: BD_HOST,
  password: BD_PASSWORD,
  database: BD_DATABASE,
  port: BD_PORT,
});

// pool.query("SELECT NOW()").then((result) => {
//   console.log(result);
// });
