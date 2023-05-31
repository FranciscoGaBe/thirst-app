#!/usr/bin/env node
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { loadControllers } from './infrastructure/controllers/loadControllers'

const app = express()
const port = process.env.PORT ?? 8000

app.use(bodyParser.json())
app.use(cors())
app.set('port', port)

loadControllers(app)

export default app
