import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Users = sequelize.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(28),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(256),
        allowNull: false
    }
}, {
    timestamps: true
})

export default Users;