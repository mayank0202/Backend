let express = require('express');

let router = express.Router();

const users = require('../controllers/controller.js');
router.post('/users', users.create);
router.get('/users', users.getAlluser);
router.put('/users/:id', users.update);
router.delete('/users/:id', users.delete);



module.exports = router;