module.exports = (sequelize, Sequelize) => {
    const customer = sequelize.define('customer', {
        customerid: {
            type: Sequelize.INTEGER,
            primarykey: true
        },
        customername: {
            type: Sequelize.STRING
        },
        customerWebsite: {
            type: Sequelize.STRING
        },
        customerAddress: {
            type: Sequelize.STRING
        }

    })
}