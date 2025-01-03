import pool from "./pool.js";

export async function getAllUsernames() {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
}

export async function insertUsername(username) {
    let id = 0
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [ username]);
}

export async function searchUsername(username) {
    if(!username) return [];

    const { rows } = await pool.query("SELECT * FROM usernames WHERE username ILIKE $1", [`${username}%`])

    return rows;
}

export async function removeAllUsernames() {
    await pool.query("DELETE FROM usernames");
}