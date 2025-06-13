const express = require('express');
const product =  require ('../module/Product')


const addProduct = async(req,resp)=>{
try{
const data =  req.body
let result = new  product(data)
result= await result.save();
resp.status(201).send (result)
console.log('data saved')
}
catch(error){
resp.status(400).send('bad request')
}
}
const getproduct =async(req,resp)=>{
try {
let result = await product.find();
resp.status(200).send(result)
}
catch(error){
    resp.status(400).send('bad request')
}
}

const updateProduct = async(req,resp)=>{
try{
const data = req.body;
let result = await product.updateOne({_id: req.params._id},
    {
$set:data
})
resp.status(201).send(result);
}
catch(error){
resp.status(400).send('bad request')
}
}
const deleteproduct = async(req,resp)=>{
try{
 let result = await product.deleteOne({_id:req.params._id})
 resp.status(200).send(result)
}
catch(error){
resp.status(400).send('bad request')
}

   


}
const getsingleproduct =async(req,resp)=>{
try{
let result= await product.findOne({_id:req.params._id})
resp.status(200).send(result)
}
catch(error){
resp.status(400).send('bad request')
}

}

const searchInFiels =async(req,resp)=>{
    try{
    let result = await product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
        ]
    }) 
    resp.status(200).send(result)
    }
    catch(error){
resp.status(400).send('bad request')
    }
}


module.exports = {addProduct,updateProduct,deleteproduct,getproduct,getsingleproduct,searchInFiels}