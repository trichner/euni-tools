/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    var LinkedAccounts = sequelize.define('linkedAccounts', {
        accountId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'accountID'
        },
        linkedOn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        linkedTo: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'linkedaccounts',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        }
    });
    LinkedAccounts.removeAttribute('id');
    return LinkedAccounts;
};
