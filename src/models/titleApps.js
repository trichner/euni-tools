/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('titleApps', { 
    appID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    characterID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    submitted: {
      type: DataTypes.DATE,
      allowNull: false
    },
    moveddate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    completed: {
      type: DataTypes.DATE,
      allowNull: false
    },
    apiCheck: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    oogCheck: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    igCheck: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    additionalInfo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    processing: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    current: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {

      }
    }
  });
};
