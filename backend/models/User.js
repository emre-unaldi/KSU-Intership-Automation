const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    surname: String,
    schoolNumber: Number,
    phoneNumber: Number,
    email: String,
    password: String,
    role:{
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student"
    }
});

// veritabanına kaydetmeden önce yap demek - model içersinde middleware oluşturur.
UserSchema.pre('save', function(next) {
    const user = this;  // o an olan kullanıcıyı yakalar
    if (!user.isModified('password')) return next();
  
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
  });

module.exports = mongoose.model('User', UserSchema);