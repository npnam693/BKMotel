import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';

import route from './routes/index.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app)

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`)})
    })
    .catch((error) => console.log(`Server can't listening`));

