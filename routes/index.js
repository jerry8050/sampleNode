var express = require('express');
var router  = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host:     'rdc-hackathon.c3d8n8cosrif.us-west-2.rds.amazonaws.com',
    user:     'root',
    password: 'realtor.com',
    database: 'ads'
});

connection.connect();

/* GET home page. */
router.get('/:id', function (req, res) {
    console.log(req.params.id);

    connection.query('SELECT * from ads', function (error, results, fields) {

        if (error) {
            return res.send("Oh,oh");
        } else
            res.send(results);
    })
    router.get('/', function (req, res, next) {
        res.render('index', {title: 'Express'});
    });
});
    module.exports = router;
