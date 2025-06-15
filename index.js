const express = require ('express');
const cors = require('cors')
const app = express();
require('dotenv').config();

const productRoutes=require('./router/productRouter');
const userRouter = require('./router/userRouter')
const connectDb=require('./config/db')
const port =process.env.PORT
const front =process.env.FRONTEND_URL

app.use(express.json());

const corsOptions ={
  origin:front,
  methods:["GET","POST","PUT","DELETE"],
  allowedHeaders :["Content-Type","authorization"]
}
app.use(cors(corsOptions))
connectDb();

app.use('/api',productRoutes)
app.use('/apiuser',userRouter)
app.listen(port,()=>{
  console.log(`app listning on port ${port}`)
});