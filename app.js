// quick app to understand how a express server with jwt token works
// found that here: https://www.youtube.com/watch?v=7nafaH9SddU

const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: 'API is running'
    })
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post created',
                authData
            })
        }
    })
    res.json({
        message: 'Diese Route ist geschützt!'
    })
})

app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }

    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        })
    })
})

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization']
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken = bearer[1]
        // Set the token
        req.token = bearerToken
        // Next middleware
        next()
    } else {
        // Forbidden
        res.sendStatus(403)
    }
}
ç
app.listen(5000, () => console.log('server started on port 5000'))