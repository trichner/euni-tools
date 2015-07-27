/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('apiPulls_skills', { 
    pullID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    skillID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
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
