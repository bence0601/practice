const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Users = require('./model/user.js')

const bcrypt = require('bcryptjs');

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });


app.use(express.json());

async function createUser(){
    try{
        const user = await Users.create({
            name : "Kis Pista",
            age : "80",
            email : "kispista88@gmail.com",
            phone : "0123456",
            date : Date.now()
        })
    }
    catch(error){
        console.log(error)
    }
}

app.get('/api/users', async(req,res) => {
    const userAPI = await Users.find()
    res.send(userAPI)
})

app.post('/api/users', async(req,res) => {
    

    const existingUser = await Users.find({ name : req.body.name}) // find-on belul megadjuk hogy milyen parameter alapjan akarjuk keresni
    if(existingUser.length > 0){ //ha mar van ilyen nevu user, akkor kiirja console-ba h ilyen mar letezik,
        console.log("User already exists")
        return res.json({ message : "anyád"}) //express kovetelmeny hogy legyen response
    }
    try{    
        const newUser = new Users({
            name : req.body.name,
            password : req.body.password,
            age : req.body.age,
            email : req.body.email,
            phone : req.body.phone,
            date : req.body.date
        })
        const savedUser = await newUser.save(); //igy mentjuk el az uj user adatait
        console.log("New user added to database")
        res.json(newUser) //elkuldjuk responseba json formatumban

    }
    catch(error){
        console.log(error)
        res.status(500).json({ message : "Server Error"})
    }
} )

app.delete('/api/users/:id', async(req,res) =>{
    try{
        const DeleteUser = await Users.findByIdAndDelete(req.params.id)//delete-nel a params az url-bol kapja a dolgokatXD
        if(!DeleteUser){
            return res.status(404).json({message : "User not found"})//res mindig az utolso!!!!!!!!
        }
        res.json({message : "User deleted"})
    }

    catch (error){
        console.log(error)
        res.status(500).json({message : "Server Error"})
    }

})

app.post('/login', async(req,res) => {
    const {name,password} = req.body
    try{
        const user = await Users.findOne({name})
        if(!user){
            return res.status(400).json({message : "User not found"})
        }
        const isMatch =  bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message : "User not found"})
        }
        res.json({message : "Logged in successfully"})
    }
    catch (error){
        console.log(error)
        res.status(500).json({message : "Server Error"})
    }
})










mongoose.connect('mongodb+srv://greenhomeklima:Reingl01@cluster0.3fxpmf1.mongodb.net/test')
app.listen(5000,() =>console.log("App is listening on port 5000"))