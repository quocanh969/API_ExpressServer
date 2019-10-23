const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const  passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require('./connecDB');


passport.use(new LocalStrategy(
    {
        usernameField: 'name',
        passwordField: 'password',
    },
    function (name, password, cb){        
        return User.findOne(
                {
                    where:{name,password}
                }
            )
            .then(user => {                
                if(!user)
                {
                    return cb(null, false, {message: 'Incorrect name or password'});
                }
                else
                {   
                    return cb(null, {id:user.id,name:user.name, password: user.password}, {message:'Logged in successfully'});
                }
            })
            .catch(err => {
                console.log("error in passport: " + err);
                return cb(err)
            });
    }
));

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: '1612018_TranQuocAnh',
    },
    function (jwtPayload, cb){        
        return User.findByPk(jwtPayload.id)
            .then(user=>{                
                return cb(null, user);
            })
            .catch(err=>{                
                return cb(err);
            })
    }
));