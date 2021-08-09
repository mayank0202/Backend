const dotenv = require('dotenv').config({ path: '../.env' });
console.log(dotenv);
const express = require('express');
const app = express();

let bodyParser = require('body-parser');

const db = require('../app/config/db.config.js');

db.sequelize.sync({ force: false }).then(() => {
    console.log('sync table again');
});

let router = require('../app/routers/router.js');

const cors = require('cors')
const corsoptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsoptions));


app.use(bodyParser.json());
app.use('/', router);

const server = app.listen(8080, function() {
    let host = server.address().address //host is localhost
    let port = server.address().port //

    console.log("App listening at http://%s:%s", host, port);
})