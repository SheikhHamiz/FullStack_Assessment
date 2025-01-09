const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController")

router.route("/")
      .get(todoController.getAllTodosOfUser)
      .post(todoController.createTodoOfUser)
      .put(todoController.updateTodo)
      .patch(todoController.updateTodoStatus)
      .delete(todoController.deleteTodo);


module.exports = router;