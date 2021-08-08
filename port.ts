const exp: any = require("express");
const port = exp();

import users from './router';
const port1 = 4200;

port.use(exp.urlencoded());

port.use(exp.static('public'));// static files which can be used anywhere 


// Parse JSON bodies (as sent by API clients)
port.use(exp.json());

//app.use(bodyParser.json());
port.get("/", (req, res) => {
  res.sendFile(__dirname+"/Frontend/index.html");
});

port.use('/users',users); // all routes are defined like /users only.


port.listen(port1, () => {
  console.log(`Example app listening at http://localhost:${port1}`);
});


