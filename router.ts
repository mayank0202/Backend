const express1 = require('express');
const fs = require('fs');
const router = express1.Router();
// all 3 packages are defind above and will be used according to the requirements

let myData = JSON.parse(fs.readFileSync("data.json").toString());  
// mydata is a gloabl variable and json.parse is used to convert text into a JavaScript object 
// fs.readfilesync is an inbuilt application programming interface of fs module which is used to read the file and return its content.
// .toString() method returns a string representing the object.

// now will start making get,post,delete and patch methods for CRUD Operations
router.get('/',(req,res)=>{ 
    res.send(myData);
  });

// create  
  router.post('/',(req,res)=>{
    let founddata:number=0; // default value is set to be 0
    const user=req.body;
    for(let data in myData){
        if(myData[data]["UId"]==user.UId){
            res.sendStatus(409);
            founddata=1; // if uid matches the existing data of same id then it will throw an error of 404 and will increment the founddata i.e. from 0 to 1.
        }
    } 
    if(founddata==0){   // if founddata is zero and no existing data is found then the new data will be pushed 
    myData.push(user);    
    const stringifyData = JSON.stringify(myData);  
    fs.writeFileSync('data.json', stringifyData); // writng the currently pushed data in data.json file.
    res.send(myData);
    // res.send("user Created"); 
    }
  });

  // delete
  router.delete('/:id',(req,res)=>{
    const { id } = req.params;
    myData = myData.filter((user)=> user.UId!=id); // if id is found in data, then it will be deleted else it will throw an error
    const stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send(myData);
    // res.send("user deleted");
});

// update
router.patch('/:id',(req,res)=>{
    const { id } = req.params;
    const user = req.body;
    for(var data in myData){
        if(myData[data]["UId"]==id){
            break;
        }
    } 
   
    myData[data]["firstName"]=user.firstName;
    myData[data]["middleName"]=user.middleName;
    myData[data]["lastName"]=user.lastName;
    myData[data]["email"]=user.email;
    myData[data]["phoneNumber"]=user.phoneNumber;
    myData[data]["role"]=user.role;
    myData[data]["address"]=user.address;

    const stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send("User updated");
  
    
});
  
export default router;
