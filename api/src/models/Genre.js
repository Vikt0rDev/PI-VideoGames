const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "genre",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
