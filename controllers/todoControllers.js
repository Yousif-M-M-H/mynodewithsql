const { where, Model } = require("sequelize");
const asyncHandler = require("express-async-handler");
const db = require("../models");

const Todo = db.todos;

const addTodo = asyncHandler(async (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || !description) {
    res.status(400).json({ message: "Title and description are required" });
    return;
  }

  let info = {
    title: title,
    description: description,
    completed: completed ? completed : false,
  };

  const todo = await Todo.create(info);
  res.status(201).json(todo);
});

const getAllTodos = asyncHandler(async (req, res) => {
  let todos = await Todo.findAll({
    attributes: ["id", "title", "description", "completed"],
  });
  console.log(todos);
  res.status(200).json(todos);
});

const getSingleTodo = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let todo = await Todo.findOne({
    where: { id: id },
  });

  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

const updateTodo = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let [updated] = await Todo.update(req.body, { where: { id: id } });

  if (updated) {
    res.status(200).json({ message: "Todo is updated" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

const deleteTodo = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let deleted = await Todo.destroy({ where: { id: id } });

  if (deleted) {
    res.status(200).json({ message: "Todo is deleted" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

const getCompletedTodos = asyncHandler(async (req, res) => {
  let todos = await Todo.findAll({
    where: {
      completed: true,
    },
  });
  res.status(200).json(todos);
});

module.exports = {
  addTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
  getCompletedTodos,
};
