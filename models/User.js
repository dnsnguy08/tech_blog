const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {}

// define table columns and configuration
User.init(
    {
        // define an id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {


        sequelize,
        timestamps: false,
        // freezeTableName: true,
        // underscored: true,
        modelName: 'user',
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            beforeCreate: async (user) => {
                try {
                    const hashedPassword = await bcrypt.hash(user.password, 8);
                    user.password = hashedPassword;
                    return user;
                } catch (error) {
                    throw new Error(error);
                }
            },

            beforeUpdate: async (user) => {
                if (user.password.trim().length > 0) {
                    try {
                        const hashedPassword = await bcrypt.hash(user.password, 8);
                        user.password = hashedPassword;
                        return user;
                    } catch (error) {
                        throw new Error(error);
                    }
                }
            },
        },
    }
);

module.exports = User;