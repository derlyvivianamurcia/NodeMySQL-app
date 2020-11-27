const express = require('express');
const app = express();


app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.get('/', (req, res)=>{
  res.send('Esto posiblemente salga mal')
})

app.use('/api', require('./routes/usuario'));


app.listen(app.get('port'),()=>{
  console.log(`servidor corriendo en el puerto ${app.get('port')}`);
})