const {
    NODE_ENV = 'development',
    DB_HOST = 'localhost',
    DB_NAME,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    PORT = 3000
} = process.env;

export default {
    ENV: NODE_ENV,
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    PORT
};