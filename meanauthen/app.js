const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
// var date = new Date().toISOString().
// replace(/T/, ' ').      
// replace(/\..+/, '');

//console.log(date);

mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
    console.log("Connected to database" + config.database); 
});

mongoose.connection.on('error',(err)=>{
    console.log("error" +err); 
});
const app = express();

const users = require('./routes/users');

const port = 3080;
app.use(cors());

//set static folder

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get('/', (req,res) =>{
});








  
  
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + ".jpg")
    }
  })
  var upload = multer({ storage: storage })

  app.post('/profile', upload.fields([{ name: 'profile', maxCount: 1 },
  { name: 'cover', maxCount: 1 }]), function (req, res, next) {

    if(!req.files) return res.json({seccess:false})
    else res.json({success:true,result:req.files});
  
   
  })


app.use('/users',users);

app.listen(port, ()=>{
console.log("server started on port"+ port);

});

