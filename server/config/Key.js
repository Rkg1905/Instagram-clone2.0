if(process.env.NODE_ENV==='production'){
    return module.exports=require('./prod')
}
else{
    module.exports=require('./dev')
}
