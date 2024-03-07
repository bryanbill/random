import { User } from ".";
import { sequelize } from "../config";
import { DataTypes } from "sequelize";

export const Journal = sequelize.define("journal", {
    id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [0, 500]
        }
    },

}, {
    timestamps: true
});