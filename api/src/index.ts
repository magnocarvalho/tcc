import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes/Rotas';
import PagamentoCtrl from './controllers/PagamentoCtrl';

var app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('useFindAndModify', false); // biblioteca depreciada
mongoose.connect('mongodb://localhost:27017/meifacil', { useNewUrlParser: true });


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'PUT, POST, DELETE, GET');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

app.options('*', function (req, res, next) {
    if (req.method == 'OPTIONS')
        // res.status(200);
        res.sendStatus(200);

});

app.use('/', routes);

app.use(function (req, res, next) {
    let err: any;
    err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong. Please try again",
        status: err.status || 500
    });
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

var port = 1337;
app.listen(port);
