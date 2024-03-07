import { Sequelize } from "sequelize";
import config from "./config";

const sequelize = new Sequelize(`${config.Db.Dialect}://${config.Db.User}:${config.Db.Password}@${config.Db.Host}:${config.Db.Port}/${config.Db.Database}`)

export default sequelize;