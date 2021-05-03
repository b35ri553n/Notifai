const express = require('express')
const dotenv = require('dotenv')
// const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')

// Load config
dotenv.config({ path: './config/config.env'})

// Passport config
require ('./config/passport')(passport)
// connectDB() 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true,
    useFindAndModify: false }, () => console.log("MongoDB Connected"))

const app = express()

// Logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars
app.engine('hbs', exphbs({defaultLayout:'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static Folders
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
)