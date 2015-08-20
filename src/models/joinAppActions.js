/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('joinAppActions', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'actionID'
    },
    appId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'appID'
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
