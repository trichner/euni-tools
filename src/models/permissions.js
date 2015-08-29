/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('permissions', {
        groupId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'groupID'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        joinApps: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        joinStats: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        editJoinNotes: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        titleApps: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        titleStats: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        editTitleNotes: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        dnr: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'permissions',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        }
    });
};
