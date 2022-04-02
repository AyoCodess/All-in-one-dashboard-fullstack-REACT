const express = require('express');
const mongos = require('mongoose');
const cors = require('cors');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(express.json());
// -  stops cross origin errors
app.use(cors());

// - mongoose connect

mongoose
  .connect(
    'mongodb+srv://ayocodes:adesanya@netflixayocodes.ocjpw.mongodb.net/netflixayocodes?retryWrites=true&w=majority',
    {
      useNewURLParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('connected to DB'))
  .catch(console.error);

// -  Models
const Task = require('./models/task');

// - task
app.get('/all-tasks', async (req, res) => {
  const tasks = await Task.find();

  res.json(tasks);
});

app.post('/task/new', (req, res) => {
  const task = new Task({
    title: req.body.title,
    task: req.body.task,
    status: req.body.status,
  });

  task.save();

  res.json(task);
});

app.delete('/task/delete/:id', async (req, res) => {
  const response = await Task.findByIdAndDelete(req.params.id);

  res.json({ response });
});

app.put('/task/update/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);

  task.name = req.body.name;
  task.task = req.body.task;

  task.save();

  res.json(task);
});

app.listen(3001, () => console.log('server 3001 connected'));
