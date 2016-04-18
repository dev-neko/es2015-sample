import express from 'express';

const app = express();

app.get('/', function(request, response) {
  console.log('Hello world!!');
  response.sendFile(__dirname + "/views/index.html");
});

app.listen(3000);

