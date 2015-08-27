/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('standingPulls', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: 'standingID'
        },
        pullId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'pullID'
        },
        characterId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'characterID'
        },
        standings: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        pulledOn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        converted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'standingPulls',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        }
    });
};
