export const appConfig = () => ({
    server: {
        port: process.env.SERVER_PORT
    },
    database: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        dbName: process.env.DATABASE_NAME
    },
    jwt: {
        accessToken: process.env.JWT_ACCESS_TOKEN
    }
});