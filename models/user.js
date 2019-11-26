var mongoose = require('mongoose');
var elmongo = require('elmongo');
const bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema ({
    username: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'User'
    },
    userImage: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type:String,
        default: ''
    },
    address: {
        type:String,
        default: ''
    },
    phoneNumber: {
        type: Number,
        default: ''
    },
    fbTokens: Array,
    facebook: {
        type: String,
        default: ''
    },
    google: {
        type: String,
        default: ''
    },
    isApproved: {
        type:Boolean,
        default: true
    },
    resetToken: {
        token: String,
        expires: Date
    },
    created: {
        type: Date, 
        default: Date.now
    }
});

UserSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validUserPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);