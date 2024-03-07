import { Sequelize } from "sequelize";
import config from "./config";
import redis from "redis";

const sequelize = new Sequelize(`${config.Db.Dialect}://${config.Db.User}:${config.Db.Password}@${config.Db.Host}:${config.Db.Port}/${config.Db.Database}`)
const redisClient = redis.createClient({

});

export {
    sequelize,
    redisClient
}