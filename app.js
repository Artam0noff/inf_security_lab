const express = require('express');
const config = require('config')
const fs = require('fs');
const makeFile = require('./routes/makeFile');

const path = './model/data.xlsx';

try {
  if (fs.existsSync(path)) {
    console.log('EXIST');
  } else {
    makeFile();
  }
} catch(err) {
  console.error(err)
}

const app = express();

app.use(express.json({extended: true}))

app.use('/api/auth',require('./routes/auth.routes'));
app.use('/api/adminPanel',require('./routes/admin.routes'));

const PORT = config.get('port') || 5000

app.listen(PORT, () => console.log('App has been strated on port:' + PORT));