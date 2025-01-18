const mongoose = require('mongoose');

function conncectToDbs(){
    mongoose.connect('mongodb+srv://vikas18046171:<Allenkota@123>@cluster0.o0cfg.mongodb.net/uberClone').then(()=>{
        console.log('connected to DB');
    }).catch(err=> console.log(err))
}

module.exports = conncectToDbs
