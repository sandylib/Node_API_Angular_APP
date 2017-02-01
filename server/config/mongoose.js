  var mongoose = require('mongoose'),
    UserModel = require('../models/User'),
    CourseModel = require('../models/Course');
  

module.exports = function (config){
     mongoose.Promise = global.Promise;
     mongoose.connect(config.db);
     var db = mongoose.connection;
     db.on('error', console.error.bind(console, 'connection error...'));    
     db.once('open', function callback() {
         console.log('multivision db opened');
     });

     UserModel.createDefaultUsers();   
     CourseModel.createDefaultCourses(); 

};

