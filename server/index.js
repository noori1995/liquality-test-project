const express =require('express');
const app=express();

app.use(express.static(__dirname + "/../dist"));

app.get('*',(req,res)=>{
        return res.sendFile('index.html', {root:__dirname + '/../dist/'})
})
app.listen(80,()=>{
    console.log('app running on port 80')
});

module.exports=app;