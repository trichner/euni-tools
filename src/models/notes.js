/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('notes', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: 'noteID'
        },
        authorId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'authorID'
        },
        characterId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'characterID'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'postedOn'
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'notes',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        }
    });
};
