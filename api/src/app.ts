#!/usr/bin/env node
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'node:path'

import { loadControllers } from './infrastructure/controllers/loadControllers'

const app = express()
const port = process.env.PORT ?? 8000

app.use(express.static(path.join(__dirname, '..', 'storage')))
app.use(bodyParser.json())
app.use(cors())
app.set('port', port)

loadControllers(app)

export default app
