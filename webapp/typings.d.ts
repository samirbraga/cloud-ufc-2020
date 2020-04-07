declare module '*.css';
declare module '*.less';
declare module "*.png";
declare module "*.json";

declare type User = {
    name: string,
    age: number,
    email: string,
    birthdate: Date
}

declare type TextFieldProps = {
    target: {
        value: string
    }
}

declare type PhotoInputElement = {
    target: {
        files: Array<BinaryType>
    }
}