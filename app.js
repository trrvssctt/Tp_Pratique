require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));
const taskSchema = new mongoose.Schema({
title: String,
completed: Boolean,
});
const Task = mongoose.model('Task', taskSchema);
// Route pour ajouter une tâche
app.post('/tasks', async (req, res) => {
try {
const task = new Task(req.body);
await task.save();
res.status(201).send(task);
} catch (err) {
res.status(400).send(err);
}
});
app.listen(3000, () => console.log('Server is running on port 3000'));