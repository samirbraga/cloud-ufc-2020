import { Request, Response } from "express";
import { OK, UNAUTHORIZED } from "http-status-codes";
import { ISecureRequest } from "@overnightjs/jwt";
import PostService from "../../service/PostService";

type NextFunction = (err?: Error) => void

const postService = PostService.getInstance() 

export default async function postAuthorityMiddleware(req: ISecureRequest, res: Response, next: NextFunction) {
    const { userId, postId } = req.params
    if (postService.checkPostAuthority(parseInt(postId), parseInt(userId))) {
        next()
    } else {
        res.status(UNAUTHORIZED).json({
            status: 'error',
            message: 'Você não tem autorização para realizar a operação.'
        })
    }
}