const express = require('express');
const cors = require("cors")
const Jwt = require ('jsonwebtoken');
const jwtKey = 'e-com';
require('./db/config');
const User = require('./module/User');
const Product = require('./module/Product')
const app = express();

app.use(express.json());
app.use(cors());
app.post('/register', async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password
  if (result) {
      Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token) =>{
if (err){
resp.send({result:'something went wrong'})
}
         resp.send({result, auth:token})
      })
     
    }
})
app.post('/login', async (req, resp) => {
  let user = await User.findOne(req.body).select('-password')
  if (req.body.email && req.body.password) {
    if (user) {
      Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token) =>{
if (err){
resp.send({result:'something went wrong'})
}
         resp.send({user, auth:token})
      })
     
    }
    else {
      resp.send({ result: 'no user found' })
    }
  }
  else {
    resp.send({ result: 'no user found' })
  }
})

app.post('/addproduct', verifyToken,async (req, resp) => {
  const product = new Product(req.body)
  let result = await product.save();
  resp.send(result)
})
app.get('/products',verifyToken, async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products)
  }
  else {
    resp.send({ result: 'no result found' })
  }
})

app.delete('/deleteproduct/:id',verifyToken, async (req, resp) => {

  const result = await Product.deleteOne({ _id: req.params.id })
  resp.send(result);
})
app.get('/product/:_id',verifyToken, async (req, resp) => {
let result = await Product.findOne({_id:req.params._id})
if(result){
  resp.send(result)
}
else{
  resp.send({result:'no record found'})
}
})
app.put('/product/:_id', verifyToken,async (req, resp) => {
  let result =await Product.updateOne(
    {_id:req.params._id},
    {
$set: req.body
    }
  )
  resp.send(result)
})
app.get('/search/:key', verifyToken ,async (req, resp) => {
  let result = await Product.find({
    "$or":[
      {name:{$regex:req.params.key}},
        {company:{$regex:req.params.key}},
         {category:{$regex:req.params.key}}
    ]
  })
  resp.send(result)
})

function verifyToken(req,resp,next){
let token = req.headers['authorization'];
if(token){
token = token.split(' ')[1]
  console.log('middleware called',token)
  Jwt.verify(token, jwtKey ,(err,valid) =>{
if(err){
  resp.status(401).send({result:"please provide valid token"})

}else{
  next();
}
  })
}else{
  resp.status(403).send({result:"please add token with header"})
}


}
app.listen(3000);
