let express = require("express");
const bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
const db = require('./queries')
const Queue = require('./Queue')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors())

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getCustomers)

app.get('/customers', db.getCurrentCustomers)

app.get('/login/:username', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var queryType = req.body.queryType;
    console.log(`Username: ${username} Password: ${password} QueryType: ${queryType}`);
    db.addCustomerQuery(username, queryType).then((result) => {
        res.status(200).send({ success: "Successfull query added!!" });
        res.end();
    }, (error) => {
        res.status(400).send(error);
        res.end();
    }).catch((error) => {
        res.status(400).send(error);
        res.end();
    })


})

app.listen(3001, () => {
    console.log(`App running on port 3001.`)
})