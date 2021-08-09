const db = require('../config/db.config.js');
const User = db.user;

exports.create = (req, res) => {
    let user = {};

    try {
        user.firstname = req.body.firstname;
        user.middlename = req.body.middlename;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.phonenumber = req.body.phonenumber;
        user.role = req.body.role;
        user.address = req.body.address;

        User.create(user).then(result => {
            res.status(200).json({
                message: "upload successfully a user with id=" + result.id,
                users: [result],
                error: ""
            });
        })
    } catch (error) {
        res.status(500).json({
            message: "fail!",
            users: [],
            error: error.message
        });
    }
}


exports.getAlluser = (req, res) => {
    try {
        User.findAll()
            .then(userInfo => {
                res.status(200).json({
                    userInfo
                })
            })
            // res.status(200).json({ id: 1, name: 'mayank', age: 22 }, { id: 2, name: 'faizan', age: 22 });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "get error!",
            error: error
        });
    }
}

exports.delete = async(req, res) => {
    try {
        let userid = req.params.id;
        let user = await User.findByPk(userid);

        if (!user) {
            res.status(404).json({
                message: "Does not exist a user withid = " + userid,
                error: "404",
                users: []
            })
        } else {
            await user.destroy();
            res.status(200).json({
                message: "Delete Successfully a user with id = " + userid,
                users: [user],
                error: ""
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error-> Can not delete a user with id = " + userid,
            error: error.message,
            users: []
        });
    }
}


exports.update = async(req, res) => {
    try {
        let userid = req.params.id;
        let user = await User.findByPk(userid);

        if (!user) {
            res.status(404).json({
                message: "Not Found For Updating a customer with id = " + userid,
                users: [],
                error: "404"
            })
        } else {
            let updateObject = {
                firstname: req.body.firstname,
                middlename: req.body.middlename,
                lastname: req.body.lastname,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                role: req.body.role,
                address: req.body.address,
            }
            let result = await User.update(updateObject, { returning: true, where: { id: userid } });

            if (!result) {
                res.status(500).json({
                    message: "Error-> Can not update a user with id = " + req.params.id,
                    error: "Can Not Updated",
                    users: []
                })
            }

            res.status(200).json({
                message: "Updates Successfully user with id = " + userid,
                users: [updateObject],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error-> Can not update a user with id = " + req.params.id,
            error: error.message,
            users: []
        });
    }
}