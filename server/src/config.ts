export default {
    JWT_SECRET: process.env.JWT_SECRET,
    DB_PASS: process.env.DB_PASS,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    BCRYPT_SALT_ROUNDS: 10,
    MAX_SIGNUP_ATTEMPTS: 5,
    PAGE_SIZE: 10
};
