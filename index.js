const express = require('express')
const app = express()
const port = 8000

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let todoArr = [
  { id: 1, task: "Study Node.js", status: "Pending" },
  { id: 2, task: "Create EJS project", status: "Completed" },
  { id: 3, task: "Practice CRUD", status: "Pending" }
];

app.get('/', (req, res) => {
  res.render("index", { todoData: todoArr });
});

app.post('/add-task', (req, res) => {
  const { task, status } = req.body;
  const newId = todoArr.length > 0 ? todoArr[todoArr.length - 1].id + 1 : 1;
  todoArr.push({ id: newId, task, status });
  res.redirect('/');
});

app.get('/delete-task', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  todoArr = todoArr.filter(todo => todo.id !== taskId);
  res.redirect('/');
});

app.get('/edit-task', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const todo = todoArr.find(todo => todo.id === taskId);
  res.render("edit", { todo });
});

app.post('/edit-task', (req, res) => {
  const { id, task, status } = req.body;
  const taskId = parseInt(id);
  const todoIndex = todoArr.findIndex(todo => todo.id === taskId);

  if (todoIndex !== -1) {
    todoArr[todoIndex] = { id: taskId, task, status };
  }

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Todo App running on http://localhost:${port}`);
});
