// import { Pool } from 'pg';

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

const getCustomerfromUsername = (username) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM customercreds WHERE username = $1', [username], (error, results) => {
            if (error) {
                return reject(error)
            }
            resolve(results.rows)
        })

    })
}

const addCustomerQuery = (username, querytype) => {
    return new Promise((resolve, reject) => {
        getCustomerfromUsername(username).then((result) => {
            console.log('Result from getCustomer', result)
            var timeNow = new Date()
            pool.query('INSERT INTO customres (id, jid, username, querytype, querycreatedtime) VALUES ($1, $2, $3, $4, $5)', [result[0].id, result[0].jid, result[0].username, querytype, timeNow], (error, results) => {
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
        //pool.query('INSERT INTO customres (')
    })
}

module.exports = {
    getCustomers,
    getCurrentCustomers,
    getCustomerfromUsername,
    addCustomerQuery,
    // getUserById,
    // createUser,
    // updateUser,
    // deleteUser,
}