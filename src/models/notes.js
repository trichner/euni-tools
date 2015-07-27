/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notes', { 
    noteID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    authorID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    characterID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    postedOn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    note: {
      type: DataTypes.TEXT,
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
