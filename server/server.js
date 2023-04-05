const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Users = require('./model/user.js')



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
    if(existingUser){ //ha mar van ilyen nevu user, akkor kiirja console-ba h ilyen mar letezik,
        console.log("User already exists")
        return res.json({ message : "anyád"}) //express ko9vetelmeny hogy legyen response
    }
    try{    
        const newUser = new Users({
            name : req.body.name,
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










mongoose.connect('mongodb+srv://greenhomeklima:Reingl01@cluster0.3fxpmf1.mongodb.net/test')
app.listen(3000,() =>console.log("App is listening on port 3000"))