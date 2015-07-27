/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('joinApps', { 
    appID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    characterID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    submitted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    resubbed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    poDeferred: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    spoDeferred: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    warReentry: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    AFK: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    AFKtime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    detailsID: {
      type: DataTypes.INTEGER(11),
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
