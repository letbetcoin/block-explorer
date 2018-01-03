import express from 'express'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import index from './controllers/index'
import BaseController from './controllers/base'
import conf from './config'
import {
	NotFound,
	ERROR
} from './entities/Error'
var app = express()
var errorController = new BaseController()
// view engine setup
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(favicon('./public/favicon.png'))
app.use(logger(conf.debug.morgan || 'dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(cookieParser())
app.use(conf.server.public_path, express.static('./public'))
app.use('/', index)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(new NotFound())
})

// error handler
app.use(function (err, req, res, next) {
	let status = err.status || 500
	res.status(status)
	errorController.buildResponse('pages/error', req, res, next, null, null, {
		title: status,
		subtitle: ERROR.status_name[status] || err.message,
		message: ERROR.status_msg[status] || err.message || ERROR.status_name[status],
		status: status,
		stack: err.stack //conf.debug.error_stack ? err.stack : ''
	})
})

const port = process.env.HTTP_PORT || 4000
app.listen(port)
console.log(`Server is running on port ${port} ...`)