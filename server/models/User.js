  var mongoose = require('mongoose'),
    crypto = require('../utilities/encryption');

var userSchema = mongoose.Schema({
      fistName: {type:String, require:'{PATH} is returned!'},
      lastName:{type:String, require:'{PATH} is returned!'},
      username:{type:String,
           require:'{PATH} is returned!',
           unique:true
        },
      salt:{type:String, require:'{PATH} is returned!'},
      hashed_pwd:{type:String, require:'{PATH} is returned!'},
      roles:[String]
    });

     userSchema.methods = {
            authenticate: function(passwordToMatch) {
            return crypto.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
            },
            hasRole : function (role){
                return this.roles.indexOf(role) > -1;
            }
        };

    var User = mongoose.model('User',userSchema);

function createDefaultUsers(){

    User.find({}).exec(function(err,collection){
       if(collection.length === 0){
           var salt, hash;
           salt = crypto.createSalt();
           hash = crypto.hashPwd(salt,'sandy');
           User.create({fistName:'Sandy',lastName:'Zhang',username:'sandy', salt: salt, hashed_pwd: hash,roles:['admin']});
           salt = crypto.createSalt();
           hash = crypto.hashPwd(salt,'anna');
           User.create({fistName:'Anna',lastName:'Liang',username:'anna', salt: salt, hashed_pwd: hash,roles:[]});
           salt = crypto.createSalt();
           hash = crypto.hashPwd(salt,'anna');
           User.create({fistName:'Rachel',lastName:'Liang',username:'rachel', salt: salt, hashed_pwd: hash})
       }
    });
};

exports.createDefaultUsers = createDefaultUsers;