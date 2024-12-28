import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config"

const ENV = process.env;

const pool = new Pool({
    host: ENV.HOST,
    user: ENV.USER,
    database: ENV.DATABASE,
    password: ENV.PASSWORD,
    port: ENV.DB_PORT
})

export default pool;