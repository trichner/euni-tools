/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var linkedCharacters = sequelize.define('linkedCharacters', {
    characterId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'characterID'
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
  linkedCharacters.removeAttribute('id');
  return linkedCharacters;
};
