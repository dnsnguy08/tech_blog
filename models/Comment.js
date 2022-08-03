const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Comment model
class Comment extends Model {}

// create fields/columns for Comment model
Comment.init(
  {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'post',
          key: 'id'
        }
      },
      commentText: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      }
  },
  {
    sequelize,
    // freezeTableName: true,
    // underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;