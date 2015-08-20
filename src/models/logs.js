/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('logs', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'logID'
    },
    authorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'converserID'
    },
    characterId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'converseeID'
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
