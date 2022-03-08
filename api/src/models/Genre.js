const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "genre",
    {
      id: {
        primaryKey: true,
      }
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    { timestamps: false }
  );
};
