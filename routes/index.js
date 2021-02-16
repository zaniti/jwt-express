var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/User')
const tokenMiddlewear = require('../auth/authtoken')
const Book = require('../models/Book')

// signup
router.post('/addUser',(req,res)=>{
  
      const user = new User({
        name : req.body.name,
        phone : req.body.phone,
        password : req.body.password,
      })
      user.save()
      .then(doc=>{
        res.send(doc)
      })
      .catch(err=>{
        console.log(err);
      })
    
  
})

// login
router.post('/login',(req,res)=>{
  User.findOne({name:req.body.name})
  .then(user=>{
    if(user.password===req.body.password){
          const token = user.generateToken()
          res.send({
            user : user,
            token : token
          })
        }else{
          res.status(401).send("email or password not correct")
        }
    
  })
  .catch(err=>{
    console.log(err);
  })
})


// addbook 
router.post('/addBook',tokenMiddlewear,(req,res)=>{
  const book = new Book({
    name : req.body.name,
    author : req.body.author,
    price: req.body.price
  })
  book.save()
  .then(doc=>{
    res.status(200).send(doc)
  })
  .catch(err=>{
    res.status(404).console.log(err);
  })
})


// get all books 
router.get('/displayAll',tokenMiddlewear,(req,res)=>{
  Book.find()
  .then(books=>{
    res.status(200).send(books)
  }).catch(err=>{
    res.status(404).console.log(err);
  })
})
module.exports = router;
