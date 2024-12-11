import { Router } from "express";
import { 
    usersCreateGet, 
    usersCreatePost, 
    usersListGet, 
    usersUpdateGet, 
    usersUpdatePost,
    deleteUser,
    searchUser
    } from "../controllers/userController.js"; 

const usersRouter = Router();

usersRouter.get("/", usersListGet)
usersRouter.get("/create", usersCreateGet);
usersRouter.post("/create", usersCreatePost);
usersRouter.get("/:id/update", usersUpdateGet);
usersRouter.post("/:id/update", usersUpdatePost);
usersRouter.post("/:id/delete", deleteUser);
usersRouter.get("/search", searchUser);

export default usersRouter;