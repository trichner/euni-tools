/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('characters', { 
    characterID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    charName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fUserID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    accountID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    primaryChar: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    firstPull: {
      type: DataTypes.DATE,
      allowNull: false
    },
    latestPull: {
      type: DataTypes.DATE,
      allowNull: false
    },
    charSheetCache: {
      type: DataTypes.DATE,
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
