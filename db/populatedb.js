#! /usr/bin/env node
import pkg  from "pg";
import "dotenv/config"

const { Client } = pkg;
const ENV = process.env;

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255)
);
INSERT INTO usernames (username)
VALUES
('Brian'),
('Odin'),
('Damon');
`;

async function main() {
    console.log("sending...");

    const client = new Client({
        connectionString: `postgresql://${ENV.USER}:${ENV.PASSWORD}@${ENV.HOST}:${ENV.DB_PORT}/${ENV.DATABASE}`,
    });

    await client.connect();

    try {
        await client.query(SQL);
    } catch (error) {
        console.log(error);
    } finally {
        await client.end()
        console.log("done");
    }
}

main();