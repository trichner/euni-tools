/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('joinAppDetails', {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'detailsID'
        },
        appId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'appID'
        },
        submittedOn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        q1: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q2: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q3: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q4: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q5: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q6: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q7: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q8: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q9: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q10: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q11: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q12: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q13: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q14: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q15: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q16: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        q17: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        actedBy: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        actedOn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        appVersion: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '1'
        }
    }, {
        tableName: 'joinAppDetails',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        }
    });
};
