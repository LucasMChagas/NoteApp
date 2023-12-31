var express = require('express');
var path = require('path');
require('./config/database');
var cors = require('cors')

var usersRouter = require('./app/routes/users');
var notesRouter = require('./app/routes/notes');

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', usersRouter);
app.use('/notes', notesRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
