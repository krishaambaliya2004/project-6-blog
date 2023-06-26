const mongoose = require('mongoose')

const blogtbl = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    discription : {
        type :String,
        require : true
    },
    image : {
        type : String,
        require : true
    }
})
const crud = mongoose.model('crud',blogtbl);

module.exports = crud;