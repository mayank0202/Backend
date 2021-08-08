"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var express = require("express");
var fs = require("fs");
var router = express.Router();
var pg = require("./database");
// get data from database
router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pg.query("SELECT * FROM  users order by id ASC;")];
            case 1:
                data = _a.sent();
                // console.log(data.fields[0].first_name);
                res.json(data.rows);
                return [2 /*return*/];
        }
    });
}); });
// create data in database
router.post("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user, queryResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.body;
                return [4 /*yield*/, pg.query("INSERT INTO users(id,firstname,middlename,lastname,email,phonenumber,role,address) VALUES (" + user.id + ",'" + user.firstname + "', '" + user.middlename + "','" + user.lastname + "','" + user.email + "','" + user.phonenumber + "','" + user.role + "','" + user.address + "');", function (err, result) {
                        if (err) {
                            res.status(409).send("Cannot update, User Id already exists");
                        }
                        else {
                            res.status(200).send("User Added with ID:" + result.insertId);
                        }
                    })];
            case 1:
                queryResult = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// delete data from database
router["delete"]("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, query;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, pg.query("DELETE FROM users WHERE id=" + id + ";")];
            case 1:
                query = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// update data from database
router.patch("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, user, queryResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                user = req.body;
                return [4 /*yield*/, pg.query("UPDATE users SET firstname='" + user.firstname + "',middlename='" + user.middlename + "',lastname='" + user.lastname + "',email='" + user.email + "',phonenumber='" + user.phonenumber + "',role='" + user.role + "',address='" + user.address + "' WHERE id=" + id)];
            case 1:
                queryResult = _a.sent();
                res.send("User modified with id:" + id);
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
