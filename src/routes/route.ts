import { UserController } from '../controller/user-controller';
const express = require('express');

export class AppRouter {

    router = express.Router();

    userController = new UserController;

    constructor() {
        this.router.post("/user", this.userController.createUser);
        this.router.get("/user/all", this.userController.getUsers);
        this.router.get("/user/:id", this.userController.getUserById);
        this.router.post("/user/:id", this.userController.deleteUser);
    }

}
