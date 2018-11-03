const router =  require('express').Router(['strict']);
const keys = require("../config/keys")
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin')

router.post('/stripe', requireLogin, async(req, res)=>{
    try {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'USD',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        req.user.credits += 5;
        const user = await req.user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
    }
})

module.exports=router;