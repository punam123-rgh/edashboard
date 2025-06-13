const express = require('express');
const router = express.Router();
const  {addProduct,updateProduct,deleteproduct,getproduct,getsingleproduct,searchInFiels} = require('../controller/productcontroller')
const middleware = require('../middleware/verifyToken')

router.post('/product',middleware,addProduct);
router.put('/product/:_id',middleware,updateProduct);
router.delete('/product/:_id',middleware,deleteproduct)
router.get('/product',middleware,getproduct)
router.get('/siproduct/:_id',middleware,getsingleproduct)
router.get('/search/:key',middleware,searchInFiels)
module.exports = router;