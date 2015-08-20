/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notes', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'noteID'
    },
    authorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'authorID'
    },
    characterId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'characterID'
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
