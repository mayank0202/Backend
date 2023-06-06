"use strict";
exports.__esModule = true;
var express1 = require('express');
var fs = require('fs');
var router = express1.Router();
// all 3 packages are defind above and will be used according to the requirements
var myData = JSON.parse(fs.readFileSync("data.json").toString());
// mydata is a gloabl variable and json.parse is used to convert text into a JavaScript object 
// fs.readfilesync is an inbuilt application programming interface of fs module which is used to read the file and return its content.
// .toString() method returns a string representing the object.
// now will start making get,post,delete and patch methods for CRUD Operations
router.get('/', function (req, res) {
    res.send(myData);
});
// create  
router.post('/', function (req, res) {
    var founddata = 0; // default value is set to be 0
    var user = req.body;
    for (var data in myData) {
        if (myData[data]["UId"] == user.UId) {
            res.sendStatus(404);
            founddata = 1; // if uid matches the existing data of same id then it will throw an error of 404 and will increment the founddata i.e. from 0 to 1.
        }
    }
    if (founddata == 0) {
        myData.push(user);
        var stringifyData = JSON.stringify(myData);
        fs.writeFileSync('data.json', stringifyData); // writng the currently pushed data in data.json file.
        res.send(myData);
        // res.send("user Created"); 
    }
});
// delete
router["delete"]('/:id', function (req, res) {
    var id = req.params.id;
    myData = myData.filter(function (user) { return user.UId != id; }); // if id is found in data, then it will be deleted else it will throw an error
    var stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send(myData);
    // res.send("user deleted");
});
// update
router.patch('/:id', function (req, res) {
    var id = req.params.id;
    var user = req.body;
    for (var data in myData) {
        if (myData[data]["UId"] == id) {
            break;
        }
    }
    myData[data]["firstName"] = user.firstName;
    myData[data]["middleName"] = user.middleName;
    myData[data]["lastName"] = user.lastName;
    myData[data]["email"] = user.email;
    myData[data]["phoneNumber"] = user.phoneNumber;
    myData[data]["role"] = user.role;
    myData[data]["address"] = user.address;
    var stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send("User updated");
});
exports["default"] = router;
