import net from 'node:net';
import http from 'node:http';

const logsStorage = [];

const netServer = net.createServer((socket) => {
  socket.on('data', (data) => {
    logsStorage.push(data.toString());
  });
});

netServer.listen(3030, () => {
  console.log('netServer server started on http://127.0.0.1:3030');
});

const httpServer = http.createServer((req, res) => {
  if (req.url === '/logs') {
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(logsStorage));
    res.end();
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

httpServer.listen(3031, () => {
  console.log('httpServer server started on http://127.0.0.1:3031');
});
