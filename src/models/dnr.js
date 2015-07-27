/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dnr', { 
    accountID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    characterID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    actedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    actedOn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    standing: {
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
