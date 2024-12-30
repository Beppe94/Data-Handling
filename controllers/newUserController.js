import { getAllUsernames, insertUsername, searchUsername, removeAllUsernames } from "../db/queries.js";

export async function getUsernames(req, res) {
    const usernames = await getAllUsernames();

    res.render("usernames", {
        title: "Usernames",
        usernames: usernames,
        error: []
    })
}

export async function createUsernameGet(req, res) {
    res.render("createUsername");
}

export async function createUsernamePost(req, res) {
    const { username } = req.body;

    try {
        if(!username) {
            return res.send('Invalid input')
        }
        await insertUsername(username);
        res.redirect("/usernames");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Error " + error)
    }
}

export async function searchForUsername(req, res) {
    const query = req.query.searchUsername;
    const usersFound = await searchUsername(query);
    const usernames = await getAllUsernames();
    
    if(usersFound.length > 0) {
        res.render("usernamesFound", {
            title: "Usernames Found",
            usernames: usersFound,
        })
    } else {
        res.render("usernames", {
            title: "not found",
            usernames: usernames,
            error: usersFound.length > 0 ? null : ["Not Found"]
        })
    }
}

export async function removeUsernames(req, res) {
    await removeAllUsernames();

    res.redirect("/usernames");
}