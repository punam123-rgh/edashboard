const express = require ('express');
const app = express();
const productRoutes=require('./router/productRouter');
const userRouter = require('./router/userRouter')
const connectDb=require('./config/db')
const port =process.env.PORT
app.use(express.json());
connectDb();
app.get('/ ',(req,resp) => {
resp.send('hello')
})
app.use('/api',productRoutes)
app.use('/apiuser',userRouter)
app.listen(port,()=>{
  console.log(`app listning on port ${port}`)
});