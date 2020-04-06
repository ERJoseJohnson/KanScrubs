let express = require("express");
const bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
const db = require('./queries')
const Queue = require('./Queue')

var agentQ;
var customerQ;

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
    customerQ = new Queue()
    agentQ = new Queue()

    db.getCustomerfromUsername(username).then((custresult) => {
        //console.log('Query successfully added!!')
        //console.log('Customer information', custresult[0])
        // Routing engine
        db.getCustomerQueries().then((queryresult) => {
            //console.log('All queries', queryresult)

            for (i = 0; i < queryresult.length; i++) {
                customerQ.enqueue(queryresult[i].id)
                //console.log(customerQ.printQueue())
            }
            customerQ.enqueue(custresult[0].id)
            // console.log(customerQ)


            db.getAvailableAgents(queryType).then((result) => {
                // console.log('Getting available agents')
                console.log(result)
                console.log(result.length)
                for (i = 0; i < result.length; i++) {
                    agentQ.enqueue(result[i].id)
                    console.log('All the available agents', agentQ)
                }
            }, ((error) => {
                console.log('Error getting available agents')
                console.log(error)
            })).catch((error) => {
                console.log(error)
                console.log('Error getting available agents')
            })

            console.log(agentQ)
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
        console.log(error)
        res.status(400).send(error);
        res.end();
    }).catch((error) => {
        console.log(error)
        res.status(400).send(error);
        res.end();
    })

    if (agentQ.isEmpty()) {
        console.log('No agent found')
        res.status(200).send(chatPairs)
        res.end()
    }
    else {
        chatPairs.customer = customerQ.dequeue()
        chatPairs.agent = agentQ.dequeue()
        chatPairs.success = "true"

        db.addCustomerQuery(username, queryType, chatPairs.agent).then((addresult) => {
            console.log('Query added successfully')
        }).catch((error) => {
            console.log('Query add unsuccessful')
            console.log(error)
        })

        db.updateAgentStatus(chatPairs.agent, false).then((result) => {
            console.log('Agent status update successful')
        }).catch((error) => {
            console.log(error)
        })

        // db.setCustomerAssignedAgent(chatPairs.customer, chatPairs.agent).then((result) => {
        //     console.log('AssignedAgent successfully updated')
        // }).catch((error) => {
        //     console.log(error)
        // })

        res.status(200).send(chatPairs)
        res.end()
    }

})

app.get('/signout/:username', (req, res) => {
    var username = req.body.username
    db.getCustomerfromUsername(username).then((result) => {

        db.updateAgentStatus(result[0].assignedagent, true).then((result) => {
            console.log('Agent status update successfully')
        }).catch((error) => {
            console.log('Error when changing agent status')
            console.log(error)
        })


        db.deleteCustomerQuery(result[0].id).then((result) => {
            console.log('Query successfully deleted')
        }).catch((error) => {
            console.log(error)
        })


        res.status(200).send({ 'success': 'signout successful' })
        res.end()
    }).then((error) => {
        console.log(error)
    })
})

app.listen(3001, () => {
    console.log(`App running on port 3001.`)
})

// db.getAvailableAgents(specs).then((result) => {
//     for (i = 0; i < result.length; i++) {
//         agentQ.enqueue(result[i].id)
//         console.log('All the available agents', agentQ.printQueue())
//     }
// }, ((error) => {
//     console.log('Error getting available agents')
//     console.log(error)
// })).catch((error) => {
//     console.log(error)
//     console.log('Error getting available agents')
// })