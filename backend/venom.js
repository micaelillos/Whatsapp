const fs = require('fs');
const venom = require('venom-bot');
const Globals = require('./Globals');

const initiate = (socket,msg = 'Hi') => {
venom
  .create(
    'aaaaa',
    (base64Qr, asciiQR) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');
      if(response === {})
      console.log("EMPTY")
      var imageBuffer = response;
      require('fs').writeFile(
        'out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
          else{
            // send image
            socket.emit('image', { image: true, buffer: fs.readFileSync("./out.png").toString('base64') });
          }
        }
      );
    },
      // statusFind
      (statusSession, session) => {
        console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
        //Create session wss return "serverClose" case server for close
        console.log('Session name: ', session);
        socket.emit("ans", statusSession)

      }
    ,
    undefined,
    { logQR: false }
  )
  .then((client) => {
    socket.on('newData', newMsg => {
      console.log(newMsg)
      msg = newMsg
    })
    start(client,msg);
  })
  .catch((erro) => {
    console.log(erro);
  });
}
const start = (client,msg) => {
  // socket.on('newData', newMsg => {
  //   console.log(newMsg)
  //   msg = newMsg
  // })
  client.onMessage((message) => {
    if (message.body === Globals.TRIGGER && message.isGroupMsg === false) {
      client
      .sendText(message.from, Globals.MESSAGE)
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
    }
});
}

module.exports= {initiate}