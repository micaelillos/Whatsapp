const server = require('socket.io')(7890);
const fs = require('fs');
const Globals = require('./Globals');
const venom = require('./venom')
require("colors")
let clients = [];
// event fired every time a new client connects:
server.on('connection', (socket) => {
    console.info(`Client connected [id=${socket.id}])`);
    // initate venom



    // initialize this client's sequence number

    socket.emit('start', clients);
    // when socket disconnects, remove it from the list:
    socket.on('disconnect', () => {
        clients = clients.filter(c => c.uuid !== socket.id)
        console.info(`Client gone [id=${socket.id}]`);
    });

    socket.on('newData', data => {
        console.log(data)
        Globals.MESSAGE = data.text;
        Globals.TRIGGER = data.trigger;
      })


    socket.on('client', (data) => {
       console.log(data)
       venom.initiate(server)
    });


    socket.on("send", data => {
        for (cli of clients) {
            if (cli.data.id === data.id && socket.id !== cli.uuid) {
                // sending to individual socketid (private message)
                socket.to(cli.uuid).emit('newData', data);
                console.log(`${data.name} sent ${data.msg} to ${cli.data.name}`.green)
            }

        }

    })
});
