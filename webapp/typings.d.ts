declare module '*.css';
declare module '*.less';
declare module "*.png";
declare module "*.json";

declare type UserType = {
    name: string,
    age: number,
    email: string,
    birthdate: Date,
    username: string,
    profilePhoto: string,
    id: string

}

declare type TextFieldProps = {
    target: {
        value: string
    }
}

declare type HomeProps = {
    location: {
        state: {
            token: TokenType
        }
    }
}

declare type PostType = {
    name: string,
    photo: string,
    description: string,
    s3Address: string,
    id: number
}

declare type PostProps = {
    post: PostType
}

declare type TokenType = {
    id: number,
    token: string,
    userId: number
}