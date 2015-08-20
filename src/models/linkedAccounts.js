/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var LinkedAccounts = sequelize.define('linkedAccounts', {
    accountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'accountID'
    },
    linkedOn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    linkedTo: {
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

  return LinkedAccounts;
};
