const express = require('express'); // using express package
const port = express();
import router from './router';
const port1 = 3000;  // Port1 is defined for running the local server


// const bodyparser = require('body-parser'); 

// port.use(bodyparser.urlencoded({
//     extended:false
// }));
// port.use(bodyparser.json())

///////////////////// break //////////////////////////////

port.use(express.urlencoded());
//The express.urlencoded() function is a built-in middleware function in Express. 
//It parses incoming requests with urlencoded payloads and is based on body-parser.

port.use(express.static('public'));  // we can use static public files like images,styling files etc.

port.use(express.json());
// it parses incoming requests with json payloads and is based on body-parser

port.get("/", (req, res) => {
    res.sendFile(__dirname+"/Frontend/index.html"); // connecting frontend with backend
    // res.send("hello world");
  });

  port.use('/users',router);  // defined router i.e. users for displaying json data in browser

port.listen(port1, () => {
    console.log(`Example app listening at http://localhost:${port1}`);
  });