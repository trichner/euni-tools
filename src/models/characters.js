/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    var linkedCharacters = sequelize.import(path.join(__dirname, 'linkedCharacters'));
    var characters = sequelize.define('characters', {
        characterID: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        charName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fUserID: {
            /* Forum User ID */
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        accountID: {
            type: DataTypes.INTEGER(11),
            allowNull: false
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
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        },
        instanceMethods: {
            addLinkedCharacter: function (linkedId) {
                return linkedCharacters.create({
                    characterID: this.characterID,
                    linkedTo: linkedId
                });
            },
            getLinkedCharacters: function () {
                return sequelize.query("SELECT * FROM `characters` C INNER JOIN" +
                    " `linkedcharacters` L ON C.characterID=L.linkedTo WHERE L.characterID =" +
                    " :characterID ",
                    {
                        replacements: {
                            characterID: this.characterID
                        },
                        model: characters, // FIXME does this work?
                        type: sequelize.QueryTypes.SELECT
                    })
            }
        }
    });
    return characters;
};
