import { sequelize } from "../config";
import { DataTypes } from "sequelize";

export const User = sequelize.define("user", {
    id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    timestamps: true
});