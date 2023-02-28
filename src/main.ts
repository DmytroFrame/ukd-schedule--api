import { getSchedule } from './api/getSchedule';
import express from 'express'

const app = express();


app.get('/', function(req, res) {
    res.send('hello world');
  });

getSchedule()


app.listen(3000)