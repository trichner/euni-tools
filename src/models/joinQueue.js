/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('joinQueue', {
        characterId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'characterID'
        },
        joined: {
            type: DataTypes.DATE,
            allowNull: false
        },
        timeInQueue: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        lastActive: {
            type: DataTypes.DATE,
            allowNull: false
        },
        queueType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        inInterview: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'joinqueue',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        }
    });
};
