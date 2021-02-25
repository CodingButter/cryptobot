const socket = require('socket.io')
let io
module.exports = (httpsServer)=>{
    io = socket.(httpsServer,{cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
    })
    io.sockets.on('connection', function () {
    console.log('hello world im a hot socket');
    })

    return io
}