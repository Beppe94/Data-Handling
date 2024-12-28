import { getAllUsernames, insertUsername } from "../db/queries.js";

export async function getUsernames(req, res) {
    const usernames = await getAllUsernames();
    console.log(usernames);

    res.render("usernames", {
        title: "Usernames",
        usernames: usernames
    })
}

export async function createUsernameGet(req, res) {
    res.render("createUsername");
}

export async function createUsernamePost(req, res) {
    const { username } = req.body;
    console.log(username);

    try {
        if(!username) {
            return res.send('Invalid input')
        }
        await insertUsername(username);
        res.redirect("/usernames");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Error")
    }
}