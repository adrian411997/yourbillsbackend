const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "bills",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      dia: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      monto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      mes: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
