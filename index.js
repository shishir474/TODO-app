// NOTE: keep commiting and pushing all your code on gitHub
const express = require('express');
const path = require('path');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const Todo = require('./models/todo');
// In the database name of our collection is Todo

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(express.urlencoded());// app.use indicates that it's a middleware/ THis line is written to use the parser function
// main purpose of the parser function is to make a body key inside req object whose value is the data which is being sent 
// via html form
app.use(express.static('assets'));

var task = [
    // variables name in js follow camalcase notations
    {
        taskname:"buying grocery",
        category:"personal",
        date:"10/11/19"
        
    },
    {
        taskname:"office work",
        category:"personal",
        date:"22/11/19"
    },
    {
        taskname:"ptm",
        category:"other",
        date:"10/11/19"
    }

]

app.get('/',function(req,res){

    Todo.find({},function(err,task){
            if (err){
                console.log('error in fetching the data from the database');
                return ;
            }
        return res.render('home',{
            task_list:task
        });
    });
        
    
});

// callback function for creating task
app.post('/createtask',function(req,res){
   
    Todo.create({
        taskname:req.body.taskname,
        category:req.body.category,
        date:req.body.date
    },function(err,newTask){
        if (err){
            console.log('error in creating the task');
            return;
        }
        console.log('**********', newTask);
        return res.redirect('back'); 
    });
});

// callback function for deleting task
app.get('/deletetask',function(req,res){
    var id = req.query.id;
    Todo.findByIdAndDelete(id,function(err){
        if (err){
            console.log('error in deleting an object from the database');
            return;
        }
        return res.redirect('back');
    });
  
});

app.listen(port,function(err){
    if (err){
        console.log(`error ${err}`);
        return ;
    }
    console.log(`server is running on port: ${port}`);
})
