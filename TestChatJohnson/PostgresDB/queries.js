// import { Pool } from 'pg';
const Queue = require('./Queue')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'johnson',
    host: 'localhost',
    database: 'rainbowchat',
    password: 'CustAgentDB',
    port: 5432,
})

const getCustomers = (request, response) => {
    pool.query('SELECT * FROM customercreds', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCurrentCustomers = (request, response) => {
    pool.query('SELECT * FROM customres', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAvailableAgents = (specs) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM agents WHERE (status = $1 AND querytype = $2) ORDER BY timelastavailable ASC', [true, specs], (error, results) => {
            if (error) {
                return reject(error)
            }
            resolve(results.rows)
        })

    })
}

const getCustomerQueries = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM customres WHERE assignedagent IS NULL ORDER BY querycreatedtime ASC', (error, results) => {
            if (error) {
                return reject(error)
            }
            resolve(results.rows)
        })
    })
}

const getCustomerfromCreds = (username) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM customercreds WHERE username = $1', [username], (error, results) => {
            if (error) {
                return reject(error)
            }
            resolve(results.rows)
        })

    })
}

const getCustomerfromUsername = (username) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM customres WHERE username = $1', [username], (error, results) => {
            if (error) {
                return reject(error)
            }
            resolve(results.rows)
        })

    })
}

const updateAgentStatus = (agentJID, status) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE agents SET status = $1 WHERE jid = $2', [status, agentJID], (error, results) => {
            if (error) {
                return reject(error)
            }
            resolve(results.rows)
        })

    })
}

const setCustomerAssignedAgent = (customerID, agentID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE customres SET assignedagent = $1 WHERE id = $2', [agentID, customerID], (error, results) => {
            if (error) {
                return reject(error)
            }
            resolve(results.rows)
        })

    })
}

const addCustomerQuery = (username, querytype, agentpair) => {
    return new Promise((resolve, reject) => {
        getCustomerfromCreds(username).then((result) => {
            //console.log('Result from getCustomer', result)
            var timeNow = new Date()
            pool.query('INSERT INTO customres (id, jid, username, querytype, assignedagent, querycreatedtime) VALUES ($1, $2, $3, $4, $5, $6)', [result[0].id, result[0].jid, result[0].username, querytype, agentpair, timeNow], (error, results) => {
                if (error) {
                    reject(error)
                }
                // console.log(results)
                resolve(results)
            })
        }, (error) => {
            console.log(error)
        }).catch((error) => {
            console.log(error)
        })
    })
}

const deleteCustomerQuery = (customerID) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM customres WHERE id = $1', [customerID], (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

module.exports = {
    getCustomers,
    getCurrentCustomers,
    getCustomerfromUsername,
    addCustomerQuery,
    getAvailableAgents,
    getCustomerQueries,
    updateAgentStatus,
    setCustomerAssignedAgent,
    deleteCustomerQuery,
    getCustomerfromCreds
    // getUserById,
    // createUser,
    // updateUser,
    // deleteUser,
}