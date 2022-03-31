const express =require('express');

const app=express();

app.get('*',(req,res)=>{
    if (process.env.NODE_ENV !=='production'){
        return res.send('running server in development mode!');
    } else {
        return res.sendFile('index.html',{root:__dirname+'/../dist/'})
    }
})
app.listen(80,()=>{
    console.log('app running on port 80')
});

module.exports=app;