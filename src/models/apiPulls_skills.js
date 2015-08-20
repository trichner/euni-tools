/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('apiPulls_skills', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'pullID'
    },
    skillId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'skillID'
    },
    sp: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    level: {
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
