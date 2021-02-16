var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose')



var userRouter = require('./routes/index');

var app = express();
mongoose.connect( 'mongodb://localhost/jwt' ,{ useNewUrlParser: true , useUnifiedTopology: true },(err)=>{
  if(err){
    console.log(err);
    return
  }else{
    console.log('connected...')
  }

})



app.use(express.json());

app.use('/', userRouter);


app.use(function(req, res, next) {
  next(createError(404));
});
app.listen(5000, () => console.log('Server started on port 5000'));
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;