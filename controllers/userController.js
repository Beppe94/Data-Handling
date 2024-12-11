import userStorage from "../storage/usersStorage.js";
import { body, validationResult } from "express-validator";

export function usersListGet(req, res) {
    res.render('index', {
        title: 'User List',
        users: userStorage.getUsers(),
    });
}

export function usersCreateGet(req, res) {
    res.render('createUser', {
        title: 'Create User',
    });
}

export function usersUpdateGet(req, res) {
    const user = userStorage.getAllUsers(req.params.id);    
    console.log(user);
    
    res.render('updateUser', {
        title: "Update User",
        user: user,
    });
}

const alphaErr = "Must only Contain Letters!";
const lengthErr = "Must be Between 1 and 10!";

const validateUser = [
    body("firstName").trim()
        .exists()
        .notEmpty()
        .isAlpha().withMessage(`First Name ${alphaErr}`)
        .isLength({min: 1, max: 10}).withMessage(`First Name ${lengthErr}`),

    body("lastName").trim()
        .exists()
        .notEmpty()
        .isAlpha().withMessage(`Last Name ${alphaErr}`)
        .isLength({min: 1, max: 10}).withMessage(`Last Name ${lengthErr}`),
    body("age")
        .exists()
        .isInt({min: 18, max: 110}).withMessage("Age must be between 18 and 110")
        .notEmpty()
        .isAlphanumeric().withMessage("Age must be a number"),
    body("bio")
        .exists()
        .isLength({max:200}).withMessage("Bio too long")
];

export const usersCreatePost = [
    validateUser, (req, res) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).render("createUser", {
                title: "Create user",
                errors: errors.array(),
            });
        }
        const {firstName, lastName, age, email, bio} = req.body;
        userStorage.addUser({firstName, lastName, age, email, bio});
        res.redirect('/');
    }
]

export const usersUpdatePost = [
    validateUser, (req, res) => {
        const user = userStorage.getAllUsers(req.params.id);
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).render("updateUser", {
                title: "Update User",
                user: user,
                errors: errors.array(),
            });
        }
        const {firstName, lastName, age, email, bio} = req.body;
        userStorage.updateUser(req.params.id, {firstName, lastName, age, email, bio});
        res.redirect('/');
    }
]

export function deleteUser(req, res) {
    userStorage.deleteUser(req.params.id);
    res.redirect('/');
}

export function searchUser(req, res) {
    const allUsers = userStorage.getUsers();
    const query = req.query.search;
    const userFound = []
    let title;
    
    allUsers.some((user) => {
        if(query == user.firstName || query === user.lastName) {
            userFound.push(user);
            res.render('search', {users: userFound});
        } else {
            setTimeout(() => {
                res.redirect('/');
            }, 3000);
            res.render("partials/notFound");
        }

        res.render("search");
    })

    console.log(allUsers, query);
    
} 