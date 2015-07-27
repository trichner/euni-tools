/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('logs', { 
    logID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    converserID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    converseeID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    hadOn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    log: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
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
