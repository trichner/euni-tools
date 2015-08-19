/* jshint indent: 2 */
var path = require("path");
module.exports = function (sequelize, DataTypes) {
    var linkedAccounts = sequelize.import(path.join(__dirname, 'linkedAccounts'));
    var dnr = sequelize.import(path.join(__dirname, 'dnr'));

    var accounts = sequelize.define('accounts', {
        accountID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userID: {
            /* Forum User ID */
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        keyID: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        vCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        charListCache: {
            type: DataTypes.DATE,
            allowNull: false
        },
        old: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        linkedTo: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        },
        instanceMethods: {
            addLinkedAccount: function (linkedId) {
                return linkedAccounts.create({
                    accountID: this.accountID,
                    linkedOn: Date.now(),
                    linkedTo: linkedId
                })
            },
            getLinkedAccounts: function () {
                return sequelize.query("SELECT * FROM `accounts` A INNER JOIN" +
                    " `linkedaccounts` L ON A.accountID=L.linkedTo WHERE L.accountID =" +
                    " :accountID ",
                    {
                        replacements: {
                            accountID: this.accountID
                        },
                        model: accounts, // FIXME does this work?
                        type: sequelize.QueryTypes.SELECT
                    })
            },
            getDoNotRecruit: function () {
                return dnr.find({where: {accountID: this.accountID}})
            },
            setDoNotRecruit: function (characterId, actedBy, type, reason) {
                return dnr.findOrCreate({
                    where: {accountID: this.accountID}, defaults: {
                        characterID: characterId,
                        actedBy: actedBy,
                        actedOn: Date.now(),
                        type: type,
                        reason: reason,
                        standing: 0
                    }
                })
            },
            deleteDoNotRecruit: function () {
                return dnr.destroy({where: {accountID: this.accountID}})
            }
        }
    });
    return accounts;
}

