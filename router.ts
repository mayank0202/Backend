const express = require("express");
const fs = require("fs");
const router = express.Router();
const pg = require("./database");

// get data from database
router.get("/", async (req, res) => {
  const data = await pg.query("SELECT * FROM  users order by id ASC;");
  // console.log(data.fields[0].first_name);
  res.json(data.rows);
});
// create data in database
router.post("/", async (req, res) => {

  // let found:number=0;
  const user = req.body;
  const queryResult = await pg.query(
    `INSERT INTO users(id,firstname,middlename,lastname,email,phonenumber,role,address) VALUES (${user.id},'${user.firstname}', '${user.middlename}','${user.lastname}','${user.email}','${user.phonenumber}','${user.role}','${user.address}');`,
    (err, result) => {
      if (err) {
        res.status(409).send("Cannot update, User Id already exists");
      } else {
        res.status(200).send(`User Added with ID:${result.insertId}`);
      }
    }
  );
});
// delete data from database
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const query = await pg.query(`DELETE FROM users WHERE id=${id};`);
  //res.send(myData);
});
// update data from database
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  const user = req.body;

  const queryResult = await pg.query(
    `UPDATE users SET firstname='${user.firstname}',middlename='${user.middlename}',lastname='${user.lastname}',email='${user.email}',phonenumber='${user.phonenumber}',role='${user.role}',address='${user.address}' WHERE id=${id}`
  );
  res.send(`User modified with id:${id}`);
});

export default router;
