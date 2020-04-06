declare type LikeEntity = {
    id?: number
    userId: number
    postId: number
}

declare type PostEntity = {
    id?: number
    userId: number
    publicationDate: string
    s3Address: string
}

declare type UserEntity = {
    id?: number
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
    birthdate: string
    profilePhoto: string
}

declare type TokenBlackListEntity = {
    id?: number
    token: string
    userId: number
}