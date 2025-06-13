const express =require('express');
const router = express.Router();
const{addUser,loginuser}= require('../controller/usercontroller')

router.post('/user',addUser)
router.get('/user',loginuser)
module.exports = router;