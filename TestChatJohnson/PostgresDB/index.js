let express = require("express");
const bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
const db = require('./queries')
const Queue = require('./Queue')

var agentQ = new Queue()
var customerQ = new Queue()

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

    var chatPairs = {
        "success": "false",
        "customer": "id",
        "agent": "id"
    }
    db.addCustomerQuery(username, queryType).then((result) => {
        console.log('Query successfully added!!')
        // Routing engine
        db.getCustomerQueries().then((result) => {
            for (i = 0; i < result.length; i++) {
                customerQ.enqueue(result[i].id)
                console.log(customerQ.printQueue())
            }

            if (agentQ.isEmpty()) {
                res.status(200).send(chatPairs)
                res.end()
            }
            else {
                chatPairs.customer = customerQ.dequeue()
                chatPairs.agent = agentQ.dequeue()
                chatPairs.success = "true"

                db.updateAgentStatus(chatPairs.agent).then((result) => {
                    console.log('Agent status update successful')
                }).catch((error) => {
                    console.log(error)
                })

                res.status(200).send(chatPairs)
                res.end()
            }
        }, (error) => {
            res.status(400).send(error);
            res.end();
        }).catch((error) => {
            res.status(400).send(error);
            res.end();
        })

        // res.status(200).send({ success: "Successfull query added!!" });
        // res.end();
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

db.getAvailableAgents().then((result) => {
    for (i = 0; i < result.length; i++) {
        agentQ.enqueue(result[i].id)
        console.log(agentQ.printQueue())
    }
}, ((error) => {
    console.log('Error getting available agents')
})).catch((error) => {
    console.log('Error getting available agents')
})