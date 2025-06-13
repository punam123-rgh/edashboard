const User = require('../module/User');
const jwt = require('jsonwebtoken');
const jwtkey = 'e-com';

const addUser = async (req, resp) => {
  try {
    let userInstance = new User(req.body);        // ✅ Use different name for instance
    let result = await userInstance.save();        // ✅ Save the instance properly
    result = result.toObject();
  delete result.password
    if (result) {
      jwt.sign({ result }, jwtkey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
          resp.status(401).send('Something went wrong');
        } else {
          resp.status(201).send({ result, auth: token });
        }
      });
    }
  } catch (error) {
    console.error(error);
    resp.status(400).send('Bad request');
  }
};
const loginuser =async (req,resp)=>{
try{
const data = req.body;
let result=await User.findOne(data).select('-password')
if(req.body.email && req.body.password){
jwt.sign({result},jwtkey,{expiresIn:'2h'},(err,token)=>{
if(err){
  resp.status(401).send('something went to wrong')

}
else{
  resp.status(201).send({result,auth:token})
}
})
}
else{
  resp.status(404).send('no data found')
}
}
catch(error){

}
}

module.exports = { addUser,loginuser };