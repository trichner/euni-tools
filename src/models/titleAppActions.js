/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('titleAppActions', { 
    actionID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    appID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    actedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    actedOn: {
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
