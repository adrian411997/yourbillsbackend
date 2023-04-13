const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "usuarios",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        alloNull: false,
      },
    },
    { timestamps: false }
  );
};
