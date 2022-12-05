const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
    const TASK_QUERY = "select * from todomanager.tasks";
    res.send('list of all task');
    connection.query(TASK_QUERY, (err, res) => {
        if(err) console.log(err)
        else res.send('task has been added')
    })
    res.send(res);
})

app.post('/addTask', (req, res) => {
    const ADD_QUERY = `insert into todomanager.tasks (tasks) value('${req.body.task}')`
    connection.query(ADD_QUERY, (err) => {
        if(err) console.log(err)
        else res.send('task has been added')
    })
    res.send('you can add tasks');
})

app.delete('/deleteTask/:taskid', (req, res) => {
    console.log(req.params.taskid)
    const DELETE_QUERY = `DELETE FROM todomanager.tasks where ('${req.params.taskid})`
    connection.query(DELETE_QUERY, (err, res) => {
        if(err) console.log(err)
    })
})

app.listen(4000, () => {
    console.log('running on port 4000')
})