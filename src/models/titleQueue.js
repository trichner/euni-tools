/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('titleQueue', { 
    characterId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'characterID'
    },
    joined: {
      type: DataTypes.DATE,
      allowNull: false
    },
    timeInQueue: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    lastActive: {
      type: DataTypes.DATE,
      allowNull: false
    },
    inInterview: {
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
