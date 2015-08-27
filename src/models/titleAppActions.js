/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('titleAppActions', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'actionID'
        },
        appId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'appID'
        },
        actedBy: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        actedOn: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'titleAppActions',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        }
    });
};
