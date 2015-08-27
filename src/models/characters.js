/* jshint indent: 2 */
var path = require("path");
module.exports = function (sequelize, DataTypes) {
    var linkedCharacters = sequelize.import(path.join(__dirname, 'linkedCharacters'));
    var characters = sequelize.define('characters', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            field: 'characterID'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'charName'
        },
        forumId: {
            /* Forum User ID */
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'fUserID'
        },
        accountId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'accountID'
        },
        primaryChar: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        firstPull: {
            type: DataTypes.DATE,
            allowNull: false
        },
        latestPull: {
            type: DataTypes.DATE,
            allowNull: false
        },
        charSheetCache: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'characters',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        },
        instanceMethods: {
            addLinkedCharacter: function (linkedId) {
                return linkedCharacters.create({
                    characterId: this.id,
                    linkedTo: linkedId
                });
            },
            getLinkedCharacters: function () {
                return sequelize.query("SELECT C.characterID AS id, charName AS name, fUserID AS forumId," +
                    " accountID AS accountId,primaryChar,firstPull,latestPull,charSheetCache" +
                    " FROM `characters` C INNER JOIN" +
                    " `linkedCharacters` L ON C.characterID=L.linkedTo WHERE L.characterID =" +
                    " :id ",
                    {
                        replacements: {
                            id: this.id
                        },
                        model: characters,
                        type: sequelize.QueryTypes.SELECT
                    })
            }
        }
    });
    return characters;
};
