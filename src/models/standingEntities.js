/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('standingEntities', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: 'entityID'
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        highlight: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'standingentities',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        }
    });
};
