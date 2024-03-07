import { sequelize } from "@/config";
import { DataTypes } from "sequelize";

export const Journal = sequelize.define("journal", {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUIDV4,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

}, {
    timestamps: true
});