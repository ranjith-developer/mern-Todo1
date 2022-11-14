const express = require('express')
const cors  = require('cors')
const mongoose = require('mongoose')
const app  = express()
const port = 4000

const ObjectId = require('mongoose').Types.ObjectId;

mongoose.connect('mongodb://localhost/todo', {
    useUnifiedTopology:true,    
    useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
  username: String
})

const User = mongoose.model('User', userSchema)

const todoSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [
    {
      checked: Boolean,
      text: String,
      id: String,
    },
  ],
});
const Todos = mongoose.model("Todos", todoSchema);

app.use(cors())
app.use(express.json())

app.post('/register', async (req, res) => {
    const {username} = req.body;
    const user = await User.findOne({username}).exec()
    if(user) {
      res.status(500)
      res.json({
        message: "user already exists",
      })
      return
    }
    await User.create({username});
    res.json({
        message: 'Success',
    });
});

app.post("/login", async (req, res) => {
  const {username} =  req.body;
  const user = await User.findOne({username}).exec();
  if (!user) {
    res.status(403);
    res.json({
      message: "Invalid login",
    });
    return;
  }
  res.json({
    message: "Success",
  });
});

app.post("/todos", async (req, res) => {
  const {authorization} = req.headers;
  const [, token] = authorization.split(" ");
  const [username] = token.split(":")
  const todosItems = req.body;
  const user = await User.findOne({username}).exec();
  if (!user) {
    res.status(403);
    res.json({
      message: "Invalid access"
    });
    return;
  }
  const todos = await Todos.findOne({userId: user._id}).exec();
  if (!todos) {
    await Todos.create({
      userId: user._id,
      todos: todosItems,
    });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todosItems);
});

app.get('/todos', async (req, res) => {
  const {authorization} = req.headers;
  const [, token] = authorization.split(" ");
  const [username] = token.split(":");
  const user =  await User.findOne({username}).exec();
  if (!user) {
    res.status(403);
    res.json({
      message: "Invalid access",
    });
    return;
  }
  const {todos} = await Todos.findOne({userId: user._id}).exec();
  res.json(todos);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Todo app listening at http://localhost:${port}`);
  });
});