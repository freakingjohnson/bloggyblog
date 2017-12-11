require('dotenv').config()
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , controller = require('./controller')

const app = express()
app.use(cors())
app.use(bodyParser.json())

massive(process.env.DB_CONNECTION).then(db => {
    app.set
        ('db', db)
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}))
// app.use(express.static(__dirname+ '/../build'))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, function (accessToken, refreshToken, extraParams, profile, done) {
    let userData = profile._json
    // console.log(profile)
    return done(null, profile)
}))

app.post('/postblog', controller.create)

app.get('/login', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/auth/admin',
    failureRedirect: 'http://localhost:3000/#/'
}))

passport.serializeUser(function (user, done) {
    done(null, user) //usually save user id from DB to session
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})
// make query call to find the user that matches req.user
app.get('/auth/me', function (req, res, next) {
    if (!req.user) {
        console.log('if')
        // return Promise.reject()
        res.status(401).send('login required')
    } else {
        console.log('else')
        res.status(200).send(req.user)
    }
})

app.get('/auth/logout', function (req, res) {
    req.logout()
    res.redirect('http://localhost:3000/#/')
})

app.listen(process.env.SERVER_PORT, () => { console.log('wubba lubba dub dub!') })