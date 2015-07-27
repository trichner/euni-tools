/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('apiPulls', { 
    pullID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    pulledBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    characterID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    pullDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DoB: {
      type: DataTypes.DATE,
      allowNull: false
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    corpName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    corpID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    allianceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    allianceID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    cloneName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cloneSP: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    balance: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    memoryImplant: {
      type: DataTypes.STRING,
      allowNull: true
    },
    memoryBonus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    willpowerImplant: {
      type: DataTypes.STRING,
      allowNull: true
    },
    willpowerBonus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    charismaImplant: {
      type: DataTypes.STRING,
      allowNull: true
    },
    charismaBonus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    perceptionImplant: {
      type: DataTypes.STRING,
      allowNull: true
    },
    perceptionBonus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    intelligenceImplant: {
      type: DataTypes.STRING,
      allowNull: true
    },
    intelligenceBonus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    intelligence: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    memory: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    charisma: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    perception: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    willpower: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    totalSP: {
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
