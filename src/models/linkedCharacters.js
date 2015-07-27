/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('linkedCharacters', { 
    characterID: {
      type: DataTypes.INTEGER(11),
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
};
