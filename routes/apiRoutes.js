const router =  require('express').Router(['strict']);

router.get('/logout', (req, res)=>{
    req.logout();
    return res.redirect('/');
})

router.get('/current_user', (req, res) =>{
    res.send(req.user);
});

module.exports=router;