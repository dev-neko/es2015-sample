import express from 'express';

const app = express();

app.get('/', function(request, response) {
  console.log('Hello world!!');
});
app.listen(3000);

