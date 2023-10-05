const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/test', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
	const todos = await Todo.find().limit(30);
	console.log(todos);
	res.json(todos);
});
app.get('/todosp', async (req, res) => {
	const todos = await Todo.find().sort({pri:1}).limit(30);
	console.log(todos);
	res.json(todos);
});
app.get('/todosd', async (req, res) => {
	const todos = await Todo.find().sort({date:1}).limit(30);
	console.log(todos);
	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text,
		pri:req.body.pri,
		date:req.body.date
	})

	todo.save();

	res.json(todo);
});
app.post('/todo/upload',async (req, res) => {
	const data = req.body;
	const result= await Todo.insertMany(data);
	res.json(result)
  });

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});


app.listen(3001);