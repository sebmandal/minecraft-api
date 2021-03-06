// Get config from .env file
import dotenv from 'dotenv'
dotenv.config()

// Import modules
import express from 'express'
import path from 'path'

// Set up Express app (views, static files, etc.)
const app = express()
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug') // change ejs to whatever you want
app.use(express.static('./public'))

// Session setup (cookies)
import session from 'express-session'
app.set('trust proxy', 1)
app.use(
	session({
		secret: 'thisIsSecret',
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: Boolean(process.env.COOKIESECURE) || false, // true if https (not http)
		},
	})
)

// body-parser setup
import bodyParser from 'body-parser'
app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
)

// Automatically configure Express routes
import routes from './core/all_routes'
Object.entries(routes).forEach(([_, Route]) => {
	new Route().run(app)
})

// if you want custom error handling or other customizations, do it here
// app.use(yourMiddlewareFunction);

// Start the Express server
app.listen(process.env.PORT || 3000)
