/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('standings', {
        standingId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'standingID'
        },
        entityId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'entityID'
        },
        standing: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false
        }
    }, {
        tableName: 'standings',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        }
    });
};
