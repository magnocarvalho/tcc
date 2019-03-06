import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as routes from './routes/api';


var app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_HOST,  { poolSize: 5 });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'PUT, POST, DELETE, GET');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    next();
});

app.use(express.static(path.join(__dirname, 'front')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.options('*', function (req, res, next) {
    if (req.method == 'OPTIONS')
        res.sendStatus(200);
});


app.use('/api', routes);

app.use(function (req, res, next) {
    let err: any;
    err = new Error('Not found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});
var port = process.env.PORT || 1337;
app.listen(port);