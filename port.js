"use strict";
exports.__esModule = true;
var express = require('express'); // using express package
var port = express();
var router_1 = require("./router");
var port1 = 3000; // Port1 is defined for running the local server
// const bodyparser = require('body-parser'); 
// port.use(bodyparser.urlencoded({
//     extended:false
// }));
// port.use(bodyparser.json())
///////////////////// break //////////////////////////////
port.use(express.urlencoded());
//The express.urlencoded() function is a built-in middleware function in Express. 
//It parses incoming requests with urlencoded payloads and is based on body-parser.
port.use(express.static('public')); // we can use static public files like images,styling files etc.
port.use(express.json());
// it parses incoming requests with json payloads and is based on body-parser
port.get("/", function (req, res) {
    res.sendFile(__dirname + "/Frontend/index.html"); // connecting frontend with backend
    // res.send("hello world");
});
port.use('/users', router_1["default"]); // defined router i.e. users for displaying json data in browser
port.listen(port1, function () {
    console.log("Example app listening at http://localhost:" + port1);
});
