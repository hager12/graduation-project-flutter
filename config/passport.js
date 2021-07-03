const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const Employee = require('../models/employee.model');
const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
//serialize deserizlize
passport.serializeUser((entity, done)=> {
    done(null, { id: entity.id});
});
passport.deserializeUser((obj ,done)=>{
    if ('user-signin'){
        User.findById(obj.id,(err, user)=> {
            done(err, user);
          });
     }
    if('admin-signin')  {
        Admin.findById(obj.id,(err, admin)=> {
            done(err, admin);
          });
     } else {
    Employee.findById(obj.id,(err, employee)=> {
        done(err, employee);
      });  
    }
});

// Signup-All
passport.use('user-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return done(err)
        }
        if (user) {
            return done(null, false, req.flash('signupError', 'this eamil already exist'))
        }
        const newUser = new User({
            email: email,
            password: new User().hashPassword(password),
        })
        newUser.save((err, user) => {
            if (err) {
                return done(err)
            }
            return done(null, user);
        })
    })
}));
/*passport.use('admin-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    Admin.findOne({ email: email }, (err, admin) => {
        if (err) {
            return done(err)
        }
        if (admin) {
            return done(null, false, req.flash('signupError', 'this eamil already exist'))
        }
        const newAdmin = new Admin({
            email: email,
            password: new Admin().hashPassword(password),
        })
        newAdmin.save((err, admin) => {
            if (err) {
                return done(err)
            }
            return done(null, admin);
        })
    })
}));*/
//Signin-All
passport.use('user-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
} ,(req, email , password, done)=> {
    User.findOne({email : email},(err, user)=> {
        if (err) throw err;
        if (!user) {
            return done(null, false, req.flash('signinError', 'user  not found'));
        }
        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (!isMatch)
                return done(null, false, req.flash('signinError', 'wrong password'));
            else
                return done(null, user);
        })
    })
}));
passport.use('admin-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},(req,email, password, done)=> {
    Admin.findOne({email : email},(err, admin)=> {
        if (err) throw err;
        if (!admin) {
            return done(null, false, req.flash('signinError', 'Admin  not found'));
        }
        bcrypt.compare(password, admin.password, function (err, isMatch) {
            if (err) throw err;
            if (!isMatch)
                return done(null, false, req.flash('signinError', 'password wrong'));
            else
                return done(null, admin);
        })
    })
}));

passport.use('employee-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},(req,email, password, done)=> {
    Employee.findOne({email : email}, function (err, employee) {
        if (err) throw err;
        if (!employee) {
            return done(null, false, req.flash('signinError', 'Employee  not found'));
        }
        bcrypt.compare(password, employee.password, function (err, isMatch) {
            if (err) throw err;
            if (!isMatch)
                return done(null, false, req.flash('signinError', 'password wrong'));
            else
                return done(null, employee);
        })
    })
}))




