const config     = require('./config');
const mongoose   = require('mongoose');


const dbConection = async() => {
    mongoose.connect(config.db,
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            autoIndex: true,
            useFindAndModify: false
        }, 
        (err, res) => {
    if(err) throw `Ha ocorrido un error a la conexion de la BBDD ---> ${err}`;
    else console.log(`Base de datos ${res.name} online`);
    });
}

const dbDisconect = async() => {
    mongoose.disconnect();
}




module.exports = {
    dbConection,
    dbDisconect
};