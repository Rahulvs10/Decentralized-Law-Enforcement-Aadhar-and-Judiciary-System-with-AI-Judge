const express = require("express");
const bodyParser = require('body-parser');
const path = require('path')
const rootRouter = require('./app/routes/rootRouter');

const app = express();
const port = 8044;
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/app/views'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', rootRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})