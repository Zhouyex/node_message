

var express = require('express');
var MongoClient = require('mongodb').MongoClient
var app = express();

var ObjectId = require('mongodb').ObjectId;

var dataUrl = "mongodb://127.0.0.1:27017";
//express  解决跨域问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

//删除
app.get('/del',(req,res)=>{
    var query= req.query;
    console.log(query);

   MongoClient.connect(dataUrl,{useNewUrlParser:true},(err,client)=>{
       if(err){
           var json = {
               ok:false,
               msg:"删除时，数据库连接不上"
           };
           res.send(json)
       }else{
           var json = {
               _id : ObjectId(query._id)
           };
           client.db('message').collection('student').deleteOne(json,(err,data)=>{
               if(err){
                   var json = {
                       ok:false,
                       msg:"删除失败"
                   };
                   res.send(json)
               }else{
                   var json = {
                       ok:false,
                       msg:"删除成功",
                       // result:result
                   };
                   res.send(json)
               }
           })

       }
   })

});

app.get('/find',(req,res)=>{

    MongoClient.connect(dataUrl,{useNewUrlParser:true},(err,client)=>{
        if(err){
            var json = {
                ok:false,
                msg:"全查找，数据库连接失败"
            }
            res.send(json)
        }else{
            client.db('message').collection('student').find().toArray((err,result)=>{
                if(err){
                    var json = {
                        ok:false,
                        msg:"错了"
                    }
                    res.send(json)
                }else{
                    var json = {
                        ok:false,
                        msg:"查找成功",
                        result:result
                    }
                    res.send(json)
                }
            })
        }
    })
});


app.get('/add',(req,res)=>{
    var query = req.query;
    if(query.name==""||query.age==""||query.remk==""){
        var json = {
            ok:false,
            msg:"提交的数据有空的"
        };
        // console.log(query)
        res.send(json);
        return
    }else{
        MongoClient.connect(dataUrl,(err,client)=>{
            if(err){
                var json = {
                    ok:false,
                    msg:"插入数据时，数据库连接错误"
                };
                res.send(json)
            }else{
                client.db('message').collection('student').insertOne(query,(err,data)=>{
                    if(err){
                        var json = {
                            ok:false,
                            msg:"插入数据错误"
                        };
                        res.send(json)
                    }else{
                        var json = {
                            ok:true,
                            msg:"提交成功"
                        }
                        res.send(json)
                    }
                })
            }
        })
        // res.send('ok')
    }

});

app.listen(80);
