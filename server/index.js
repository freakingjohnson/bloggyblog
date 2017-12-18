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
app.use(bodyParser.json({limit: '500mb'}))
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}))

massive(process.env.DB_CONNECTION).then(db => {
    app.set
        ('db', db)
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}))
app.use(express.static(__dirname+ '/../build'))

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
app.post('/postimage', controller.postImage)
app.post('/postmessage', controller.postMessage)
app.get('/getblogpost', controller.getBlogPost)
app.get('/getimage', controller.getImage)
app.get('/getmessage', controller.getMessage)
app.put('/updateblog', controller.updateBlog)
app.delete('/deleteblog/:id', controller.deleteBlog)
app.delete('/deleteimage/:id', controller.deleteImage)

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.AUTH_PRIVATE_REDIRECT,
    failureRedirect: process.env.AUTH_LANDING_REDIRECT
}))

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

app.get('/auth/me', function (req, res, next) {
    if (!req.user) {
        console.log('if')
        res.status(401).send('login required')
    } else {
        console.log('else')
        res.status(200).send(req.user)
    }
})

app.get('/auth/logout', function (req, res) {
    req.logout()
    res.redirect(process.env.AUTH_LANDING_REDIRECT)
})

app.listen(process.env.SERVER_PORT, () => { console.log('wubba lubba dub dub!') })