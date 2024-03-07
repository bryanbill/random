import { Sequelize } from "sequelize";
import config from "./config";
import { createClient } from "redis";

const sequelize = new Sequelize(`${config.Db.Dialect}://${config.Db.User}:${config.Db.Password}@${config.Db.Host}:${config.Db.Port}/${config.Db.Database}`, {
    logging: config.App.Env === 'development'
})

const redisClient = createClient({});

export {
    sequelize,
    redisClient
}