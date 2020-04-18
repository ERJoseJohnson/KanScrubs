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

app.post('/login/:username', (req, res) => {
    console.log('Login request received!')
    let data = req.body
    // console.log(req.body)
    let username = data.username;
    let password = data.password;
    let queryType = data.queryType;
    // console.log(`Username: ${username} Password: ${password} QueryType: ${queryType}`);

    var chatPairs = {
        "success": "false",
        "customer": "id",
        "agent": "id"
    }
    customerQ = new Queue()
    agentQ = new Queue()

    // console.log(chatPairs)

    db.getCustomerfromCreds(username).then((custresult) => {
        // console.log('Customer information', custresult)

        if (custresult.length == 0) {
            res.status(400).send({ 'success': 'sigin unsuccessful' })
            res.end()
        }
        else {

            // Routing engine
            db.getCustomerQueries().then((queryresult) => {
                // console.log('All queries', queryresult)

                for (i = 0; i < queryresult.length; i++) {
                    customerQ.enqueue(queryresult[i].id)
                    // console.log(customerQ.printQueue())
                }
                customerQ.enqueue(custresult[0].id)
                // console.log(customerQ)


                db.getAvailableAgents(queryType).then((result) => {
                    console.log('Getting available agents')
                    // console.log(result)
                    console.log(result.length)
                    for (i = 0; i < result.length; i++) {
                        agentQ.enqueue(result[i].jid)
                        // console.log('All the available agents', agentQ)
                    }

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
                        res.status(200).send(chatPairs)
                        res.end()
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
        }
    }, (error) => {
        console.log(error)
        res.status(400).send(error);
        res.end();
    }).catch((error) => {
        console.log(error)
        res.status(400).send(error);
        res.end();
    })

    // if (agentQ.isEmpty()) {
    //     console.log('No agent found')
    //     res.status(200).send(chatPairs)
    //     res.end()
    // }
    // else {
    //     chatPairs.customer = customerQ.dequeue()
    //     chatPairs.agent = agentQ.dequeue()
    //     chatPairs.success = "true"

    //     db.addCustomerQuery(username, queryType, chatPairs.agent).then((addresult) => {
    //         console.log('Query added successfully')
    //     }).catch((error) => {
    //         console.log('Query add unsuccessful')
    //         console.log(error)
    //     })

    //     db.updateAgentStatus(chatPairs.agent, false).then((result) => {
    //         console.log('Agent status update successful')
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    //     res.status(200).send(chatPairs)
    //     res.end()
    // }

})

app.post('/signout/:username', (req, res) => {
    // console.log(req)
    console.log('Signout request received!')
    var username = req.body.username
    // console.log('This is the username from request ', username)
    db.getCustomerfromUsername(username).then((custresult) => {
        // console.log(custresult)
        if (custresult.length == 0) {
            console.log('CustResult failure')
            res.status(400).send({ 'success': 'signout unsuccessful' })
            res.end()
        }
        else {

            db.updateAgentStatus(custresult[0].assignedagent, true).then((agentresult) => {
                console.log('Agent status update successfully')

                db.deleteCustomerQuery(custresult[0].id).then((result) => {
                    console.log('Query successfully deleted')
                    res.status(200).send({ 'success': 'signout successful' })
                    res.end()
                }).catch((error) => {
                    console.log('Delete Query failure')
                    // console.log(error)
                    res.status(400).send({ 'success': 'signout unsuccessful' })
                    res.end()
                })


            }).catch((error) => {
                console.log('Error when changing agent status')
                // console.log(error)
                res.status(400).send({ 'success': 'signout unsuccessful' })
                res.end()
            })

        }
        // db.deleteCustomerQuery(result[0].id).then((result) => {
        //     console.log('Query successfully deleted')
        // }).catch((error) => {
        //     console.log(error)
        // })


        // res.status(200).send({ 'success': 'signout successful' })
        // res.end()
    }).catch((error) => {
        console.log('CustResult error failure')
        console.log(error)
        // res.status(400).send({ 'success': 'signout unsuccessful' })
        // res.end()
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