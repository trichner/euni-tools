/* jshint indent: 2 */
var path      = require("path");
module.exports = function(sequelize, DataTypes) {
  var linkedAccounts = sequelize.import(path.join(__dirname, 'linkedAccounts'));
  var accounts = sequelize.define('accounts', {
    accountID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    keyID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    vCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    charListCache: {
      type: DataTypes.DATE,
      allowNull: false
    },
    old: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    linkedTo: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {

      }
    },
    instanceMethods: {
      addLinkedAccount: function(account) {

      }
    }
  });
  return accounts;
};
