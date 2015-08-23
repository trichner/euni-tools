/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('titles', {
        characterId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'characterID'
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
        returningFreshman: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'returning_freshman'
        },
        returningSophomore: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'returning_sophomore'
        },
        returningGraduate: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'returning_graduate'
        }
    }, {
        tableName: 'titles',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        }
    });
};
