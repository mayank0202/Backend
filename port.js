"use strict";
exports.__esModule = true;
var exp = require("express");
var port = exp();
var router_1 = require("./router");
var port1 = 4200;
port.use(exp.urlencoded());
port.use(exp.static('public'));
// Parse JSON bodies (as sent by API clients)
port.use(exp.json());
//app.use(bodyParser.json());
port.get("/", function (req, res) {
    res.sendFile(__dirname + "/Frontend/index.html");
});
port.use('/users', router_1["default"]);
port.listen(port1, function () {
    console.log("Example app listening at http://localhost:" + port1);
});
