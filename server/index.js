import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import route from './routes/index.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
// import path from 'path';
import cors from 'cors'
dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --------------------------DEPLOYMENT-----------------------
// let __dirname1 = path.resolve();
// __dirname1 = __dirname1.substring(0, __dirname1.length - 7)
// console.log(__dirname1)

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname1, "/client/build")));
  
//     app.get("*", (req, res) =>
//       res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
//     );
//   } else {
//     app.get("/", (req, res) => {
//       res.send("API BKMotel is running..");
//     });
// }
// --------------------------DEPLOYMENT-----------------------
app.use(cors());



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

