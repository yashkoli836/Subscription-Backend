import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";
import errorMiddleware from "../middlewares/error.middleware.js";

const userRouter = Router();

//GET /users -> get all users
//GET /user/:id -> get user by id

userRouter.get('/', getUsers)

userRouter.get('/:id',authorize, getUser)

userRouter.post('/', (req, res) => {
    res.send({title:'Create all users'})
})

userRouter.put('/:id', (req, res) => { 
    {title: 'Update user details'}
})

userRouter.delete('/:id', (req, res) => {
    res.send({title:'Delete user details'})
})

export default userRouter