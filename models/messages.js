const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Message = mongoose.model('message', messageSchema);
module.exports = Message;