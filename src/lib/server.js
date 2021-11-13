'use strict'

// npm packages
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// init app
const app = express();

// set express router // connect to middleware
const router = express.Router();

// env variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mern-starter';

// connect to mongodb  using mongoose
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// tell app to use cors and body parser (???)
app.use(bodyParser.json(), cors())

// what does require mean?
app.use(require('../route/auth-router'));

// need to understand star - is this saying all requests return 404 until request pattern specified?
app.all('*', (request, response) => {
    console.log('Returning a 404 from the catch-all route');
    return response.sendStatus(404);
});

// error middleware
app.use(require('./error-middleware'));

// start app // log to console
export const start = () => {
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`)
    })
}

export const stop = () => {
    app.close(PORT, () => {
        console.log(`Shut down on port: ${PORT}`)
    })
}