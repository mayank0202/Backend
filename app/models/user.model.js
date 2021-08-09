module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING
        },
        middlename: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phonenumber: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        }
    });

    return User;
}