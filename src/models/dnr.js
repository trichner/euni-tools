/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    var Dnr = sequelize.define('dnr', {
        accountId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            field: 'accountID'
        },
        characterId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            field: 'characterID'
        },
        actedBy: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        actedOn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        standing: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'dnr',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        }
    });
    return Dnr;
};
