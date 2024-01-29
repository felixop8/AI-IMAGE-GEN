const path = require('path')
const express = require('express')
const rateLimit = require('express-rate-limit')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

// create a rate limit object
const openaiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // limit each IP to 100 requests per window
    message: 'Too many requests, please try again later'
  });

const app = express()

// Enable body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/openai', openaiLimiter,  require('./routes/openaiRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))
