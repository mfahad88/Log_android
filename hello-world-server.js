const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const express = require('express');
const app = express();
var out;
server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
	out=new String(msg);
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

app.get('/', function (req, res) {
	  res.send(out);
	});

server.bind(41234);
app.listen(3000, () => console.log('Example app listening on port 3000!'))