const mogoose =require('mongoose');

const mongoose_url = process.env.MONGO_CONN;
mogoose.connect(mongoose_url)
    .then(() =>{
        console.log('Mongoose Connect');
        
    }
    ).catch((err) =>{
        console.log('Error : ',  err);
    }

)