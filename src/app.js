import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '/styles')));

app.get('/', function(request, response) {
  console.log('Hello world!!');
  response.sendFile(__dirname + "/index.html");
});

app.listen(3000);

