const express = require ('express');
const cors = require('cors')
const app = express();
const productRoutes=require('./router/productRouter');
const userRouter = require('./router/userRouter')
const connectDb=require('./config/db')
const port =process.env.PORT
app.use(express.json());
app.use(cors())
connectDb();

app.use('/api',productRoutes)
app.use('/apiuser',userRouter)
app.listen(port,()=>{
  console.log(`app listning on port ${port}`)
});