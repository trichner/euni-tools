/* jshint indent: 2 */
var path = require("path");
module.exports = function (sequelize, DataTypes) {
    var linkedAccounts = sequelize.import(path.join(__dirname, 'linkedAccounts'));
    var dnr = sequelize.import(path.join(__dirname, 'dnr'));

    var accounts = sequelize.define('accounts', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: 'accountID'
        },
        forumId: {
            /* Forum User ID */
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'userID'
        },
        apiKeyId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'keyID'
        },
        apiKeyVCode: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'vCode'
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
        tableName: 'accounts',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        },
        instanceMethods: {
            addLinkedAccount: function (linkedId) {
                return linkedAccounts.create({
                    accountId: this.id,
                    linkedOn: Date.now(),
                    linkedTo: linkedId
                })
            },
            getLinkedAccounts: function () {
                return sequelize.query("SELECT A.* FROM `accounts` A INNER JOIN" +
                    " `linkedAccounts` L ON A.accountID=L.linkedTo WHERE L.accountID =" +
                    " :id ",
                    {
                        replacements: {
                            id: this.id
                        },
                        model: accounts, // FIXME does this work?
                        type: sequelize.QueryTypes.SELECT
                    })
            },
            getDoNotRecruit: function () {
                return dnr.find({where: {accountId: this.id}})
            },
            setDoNotRecruit: function (characterId, actedBy, type, reason) {
                return dnr.findOrCreate({
                    where: {accountId: this.id}, defaults: {
                        characterId: characterId,
                        actedBy: actedBy,
                        actedOn: Date.now(),
                        type: type,
                        reason: reason,
                        standing: 0
                    }
                })
            },
            deleteDoNotRecruit: function () {
                return dnr.destroy({where: {accountId: this.id}})
            }
        }
    });
    return accounts;
}

