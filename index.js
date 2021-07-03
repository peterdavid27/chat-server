const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose');
const Message = require('./models/messages');
const mongooseDB='mongodb+srv://reynert:809829@cluster0.ezypr.mongodb.net/mensajes?retryWrites=true&w=majority';

//DB
mongoose.connect(mongooseDB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('DB is conectado');
   
})
.catch(err => console.log(err));
mongoose.Promise =global.Promise;



io.on('connection', socket => {
  Message.find({}).then(result => {
    console.log(result)
})
 
  socket.on('message', ({ name, message }) => {
    const msg = new Message({ name,message });
    msg.save().then(() => {
    io.emit('message', { name, message })
  })
})
})

http.listen(4000, function() {
  console.log('listening on port 4000')
})
