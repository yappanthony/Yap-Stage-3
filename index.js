const express = require('express')
const app = express()
const PORT = 3000

const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

app.get('/', (req, res) => {
    const favorite = 'Javascript';

    const q = `INSERT INTO programming_languages SET favorites = ?`
    connection.query(q, [favorite], (err) => {
        return res.status(201).json({'message': 'Data inserted successfully'})
    })
})

app.get('/programming_languages', (req, res) => {
    const q = `SELECT * FROM programming_languages`
    connection.query(q, (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            return res.status(200).json(results)
        }
    })
})


app.listen(PORT, () => console.log(`Listening to port ${PORT}`))

//Run the server using command: nodemon index.js