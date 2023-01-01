"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
<<<<<<< HEAD
    static associate(models) {
      //  association
=======
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
      User.hasMany(models.Todo, {
        foreignKey: "userID",
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
<<<<<<< HEAD
};
=======
};
>>>>>>> b8178510b30b4a4c11db63d4830f76a39d862ed2
