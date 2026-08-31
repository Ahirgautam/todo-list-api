import { DataTypes } from "Sequelize"
import sequelize from "../config/database.js"

const Todo = sequelize.define("Todo", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [1, 50]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', "working", "completed"),
        defaultValue: "pending"
    }
}, {
    timestamps: true,
    indexes: [
        {
            fields: ['status']
        }
    ]
})

export default Todo