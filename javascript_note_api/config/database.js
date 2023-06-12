const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongoose://localhost/javascriptNote', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('Connection succesful'))
.catch((err) => console.log(err));