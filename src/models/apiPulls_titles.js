/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('apiPulls_titles', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'pullID'
    },
    titleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'titleID'
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
