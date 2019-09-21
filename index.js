const express = require('express');
const mongoose = require('mongoose');
const cookieSession  = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/Survey');
require('./services/passport');
mongoose.connect(keys.mongoURI,{useNewUrlParser:true})

const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
app.use('/auth',authRoutes);
app.use('/api', apiRoutes);
app.use('/api', billingRoutes);
app.use('/api', surveyRoutes);

if(process.env.NODE_ENV === 'production'){
    //Express will serve up productions assests like main.js or main.css
    app.use(express.static('client/build'));
    //Express will serve the index.html file if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);