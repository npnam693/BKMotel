import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';

import route from './routes/index.js'

const app = express();

route(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const CONNECTION_URL = "mongodb+srv://nam_memory:nam_memory@cluster0.s8dtb44.mongodb.net/BKMotel?retryWrites=true&w=majority"

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`)})
    })
    .catch((error) => console.log(`Server can't listening`));

