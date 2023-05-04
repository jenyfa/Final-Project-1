const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://jadjei1:NFX6ao0oOMlRuZEQ@clusternot.aldvh6i.mongodb.net/?retryWrites=true&w=majority", 
        {
            useUnifiedTopology:true,
            useNewUrlParser: true
        })
    } 
    catch(err){
        console.log(err)
    }
}

module.exports = connectDB