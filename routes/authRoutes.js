const router =  require('express').Router(['strict']);
const passport = require('passport');

router.get('/google',
    passport.authenticate('google',{
        scope: ['profile', 'email']
    })
);

router.get('/google/callback',passport.authenticate('google'));

module.exports=router;