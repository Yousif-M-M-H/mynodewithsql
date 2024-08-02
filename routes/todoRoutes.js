const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoControllers");

router.post("/", todoController.addTodo);
router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getSingleTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo); 
router.get("/completed", todoController.getCompletedTodos);

module.exports = router;
