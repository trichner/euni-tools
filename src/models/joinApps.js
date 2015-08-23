/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('joinApps', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: 'appID'
        },
        characterId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'characterID'
        },
        submitted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        resubbed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        poDeferred: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        spoDeferred: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        warReentry: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        AFK: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        AFKtime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        detailsId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'detailsID'
        }
    }, {
        tableName: 'joinapps',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        }
    });
};
