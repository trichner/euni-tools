/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('apiPulls_titles', { 
    pullID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    titleID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    name: {
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
