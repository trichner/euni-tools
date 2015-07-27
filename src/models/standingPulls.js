/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('standingPulls', { 
    standingID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    pullID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    characterID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    standings: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pulledOn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    converted: {
      type: DataTypes.BOOLEAN,
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
