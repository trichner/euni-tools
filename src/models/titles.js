/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('titles', { 
    characterID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    interviewed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    freshman: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    sophomore: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    graduate: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    alpha: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    theta: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    psi: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    returning_freshman: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    returning_sophomore: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    returning_graduate: {
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
