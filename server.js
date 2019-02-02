import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/routes'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// static storage
app.use('/storage', express.static('storage'))
// thumb storage

app.use('/api', routes)

app.listen(process.env.PORT, () => console.log(`Server is listening on http://${process.env.HOST}:${process.env.PORT}`))
