const express= require("express");
const app=express();
const PORT = process.env.PORT||4000;
const mongoose= require('mongoose');
const {MONGOURI}= require('./config/Key');
app.use(express.json())


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('MongoDB connected')
 })
 .catch(err=>{
    console.log(`db err: ${err.message}`);
 }) 

require('./models/user');
require('./models/post')

mongoose.model("User");
mongoose.model("Post");


app.use(require('./routes/auth'));
app.use(require('./routes/Post'))
app.use(require('./routes/User'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running at port "+PORT);
})