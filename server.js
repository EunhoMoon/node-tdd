const express = require('express');
const mongoose = require('mongoose');

const PORT = 3000;

const app = express();

const productRouter = require('./router');


mongoose.connect('mongodb://localhost:27017/product', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    console.log('mongodb connected');
}).catch(error => {
    console.log(error);
});

app.use(express.json());

app.use('/', productRouter);

app.listen(PORT);
console.log(`Running on port ${PORT} 🐸`);
