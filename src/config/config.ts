import { configDotenv } from "dotenv";

configDotenv({
    path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env.prod"
})

export default {
    App: {
        Name: process.env.APP_NAME,
        Url: process.env.APP_URL,
        Version: process.env.APP_VERSION,
        Port: process.env.APP_PORT,
    },
    Db: {
        Dialect: process.env.DB_DIALECT,
        Host: process.env.DB_HOST,
        Port: process.env.DB_PORT,
        User: process.env.DB_USER,
        Password: process.env.DB_PASS,
        Database: process.env.DB_NAME,
    },
    Jwt: {
        Secret: process.env.JWT_SECRET,
        ExpiresIn: process.env.JWT_EXPIRES_IN,
    },
    Smtp: {
        Service: process.env.SMTP_SERVICE,
        Host: process.env.SMTP_HOST,
        Port: process.env.SMTP_PORT,
        User: process.env.SMTP_USER,
        Pass: process.env.SMTP_PASS,
    },
}