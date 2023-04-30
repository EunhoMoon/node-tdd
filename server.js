const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const productRouter = require('./router');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('mongodb connected');
}).catch(error => {
    console.log(error);
});

app.use(express.json());

app.use('/api/products', productRouter);

app.listen(process.env.PORT);
console.log(`Running on port ${process.env.PORT} 🐸`);

module.exports = app;
