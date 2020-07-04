const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://localhost/chat', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error("Coudn't connect MongoDB....", err));    
}

connect();

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Message = new Schema({
    _id: ObjectId,
    userId: String,
    message: String,
    timestamp: Number,
    date: { type: Date, default: Date.now },
});