/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('standings', { 
    standingID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    entityID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    standing: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {

      }
    }
  });
};
