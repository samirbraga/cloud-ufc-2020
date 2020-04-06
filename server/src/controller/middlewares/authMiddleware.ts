import { Request, Response } from "express";
import { OK, UNAUTHORIZED } from "http-status-codes";
import { ISecureRequest } from "@overnightjs/jwt";
import UserService from "../../service/UserService";

type NextFunction = (err?: Error) => void

const userService = UserService.getInstance() 

export default async function authMiddleware(req: ISecureRequest, res: Response, next: NextFunction) {
    const { tokenId, userId } = req.payload

    if (userService.checkToken(tokenId, userId)) {
        next()
    } else {
        res.status(UNAUTHORIZED).json({
            status: 'error',
            message: 'Você não tem autorização para realizar a operação.'
        })
    }
}